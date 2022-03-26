import { Component, OnInit, HostListener, ElementRef, Output, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { ToastrService } from 'ngx-toastr';

import { CorridaService } from 'src/app/services/corrida.service';
import { OrdenProduccionService } from 'src/app/services/orden-produccion.service';
import { OperarioService } from 'src/app/services/operario.service';
import { DevolucionService } from 'src/app/services/devolucion.service';
import { ConsumoMPriExtrusionService } from 'src/app/services/consumo-mpri-extrusion.service';
import { data } from 'jquery';

@Component({
  selector: 'app-corrida-extrusion-final',
  templateUrl: './corrida-extrusion-final.component.html',
  styleUrls: ['./corrida-extrusion-final.component.css']
})
export class CorridaExtrusionFinalComponent implements OnChanges {

  @Output() cambio = new EventEmitter();
  @Input() CorridaExtrusionFinalActualizar: any;
  @Input() CorridaExtrusionFinalDesactivar: any;

  isFocusInsideComponent = false;
  isComponentClicked = false;
  contador: any = 0;
  cortina: any;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.contador == 0 || this.eRef.nativeElement.contains(event.target) ) {
      this.contador += 1;
      this.isComponentClicked = true;
      this.isFocusInsideComponent = true;
    } else {
      this.contador += 1;
      this.cambio.emit(false);
      this.isComponentClicked = false;
      this.isFocusInsideComponent = false;

      (<HTMLInputElement>document.querySelector("#offcanvasNavbar")).style.zIndex = "1045";
      
      this.cortina[0].style.visibility = 'hidden';
    }
  }

  listMaquinasCorridaExtrusion : any[] = [
    { nombre: 'CMG1', value: 'CMG1' },
    { nombre: 'CMG2', value: 'CMG2' },
    { nombre: 'CAST', value: 'CAST' },
  ];

  listOperario : any[] = [
  ];

  
  corridafinalizada!: boolean | true;

  form: FormGroup;
 
  corridaExtrusion: any;
  DatosOperarioCorridaInicio: any;

  ngOnChanges(changes: SimpleChanges): void {
    
    this.cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>

    if (this._consumoMPriExtrusionService.MPriExtrusionTotal > 0) {
      this.corridafinalizada = this._corridaService.CorridaExtrusionFinalDesactivar;  
    }
    this.obtenerConsumosMPriExtrusion();

    this.DatosOperarioCorridaInicio = this._corridaService.DatosOperarioCorridaInicio;
    
    // Blocks the datetime for avoid the illogical data in bd
    var search_date = <HTMLFormElement> document.getElementById("FechaFinal");
    try {
      if (this.DatosOperarioCorridaInicio.fechaHora == undefined) {
        search_date.min = this.DatosOperarioCorridaInicio;    
      }else{
        search_date.min = this.DatosOperarioCorridaInicio.fechaHora;    
      }
      
    } catch (error) {
      
    }
    
  } 
  CorridasExtrusionA : any[] = [
  ];
  obtenerConsumosMPriExtrusion(){

    if (this._corridaService.CorridaExtrusion.length != 0) {
      this.CorridasExtrusionA.push(this._corridaService.CorridaExtrusion)  
    }else{

      try {
        if (this._corridaService.DatosCorridaNoFinalizada[2][0][0].pk_CorridaExtrusion) {
          this.CorridasExtrusionA.push(this._corridaService.DatosCorridaNoFinalizada[2][0][0]);    
        }
      } catch (error) {
        
      }

    }
    
    for (let index = 0; index < this.CorridasExtrusionA.length; index++) {
      if (this.CorridasExtrusionA[index].length == 0) {
        this.CorridasExtrusionA = this.CorridasExtrusionA.slice(index);
        
      }
      
    }


    try {
      this._consumoMPriExtrusionService.getConsumosMPriExtrusion(this.CorridasExtrusionA[0].pk_CorridaExtrusion).subscribe(data => {
        if (data.length > 0) {
          this.corridafinalizada = true;
        } else {
          this.corridafinalizada = false;
        }

      }, error => {
        console.log(error);
      })  
    } catch (error) {
      
    }

    this.consultarFinalizarCorrida();
    
  }

  consultarFinalizarCorrida(){
    try {
      this._operarioService.getOperarioCorridaExtrusionInicioFinal(this.CorridasExtrusionA[0].pk_CorridaExtrusion).subscribe(data => {
        if (data[0][0].length <= 1) {
        } else {
          this.corridafinalizada = false;
        }
      }, error => {
        console.log(error);
      })  
    } catch (error) {
      
    }
  }
  
  constructor( 

    private fb: FormBuilder, 
    private _operarioService: OperarioService, 
    private _ordenProduccionService: OrdenProduccionService, 
    private _corridaService: CorridaService, 
    private _devolucionService: DevolucionService, 
    private _consumoMPriExtrusionService: ConsumoMPriExtrusionService, 
    private route : ActivatedRoute, 
    private toastr: ToastrService,
    private eRef: ElementRef,

    ) {
      
    this.form = this.fb.group({
      fechaFinal: ['', [Validators.required]], 
      operarioFinal: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(1)]],})
  }


  // it save the corrida extrusion
  guardarCorridaExtrusionFinal(){

    const entrada: any = {
      fechaFinal: this.form.get('fechaFinal')?.value,
      operarioFinal: this.form.get('operarioFinal')?.value,
    }

    try {

      if (this._corridaService.DatosCorridaNoFinalizada.length != 0) {
        this.corridaExtrusion = this._corridaService.DatosCorridaNoFinalizada[2][0][0];
      }else{
        this.corridaExtrusion = this._corridaService.CorridaExtrusion;
      }
      
    } catch (error) {
      
    }

    var timeInicio = new Date(this.DatosOperarioCorridaInicio.fechaHora).getTime();
    var timeFinal = new Date(entrada.fechaFinal).getTime();
    if (timeInicio > timeFinal) {
      this.toastr.error('Ha ocurrido un error, la corrida no pudo ser finalizada la fecha de finalizacion es menor que la de entrada','Error');
    }else{
      // Obtains the operario
      this._operarioService.getOperario( entrada.operarioFinal ).subscribe(data => {
        this.listOperario = data
        if (this.listOperario.length > 0) {
  
          this.insertarOperarioCorridaExtrusion(entrada, this.corridaExtrusion.pk_CorridaExtrusion);
        }else{
          this.toastr.error('Algo ha salido mal, verifique los datos, es posible quel operario ingresado no exista', 'Corrida no registada');
        }
      }, error => {
        console.log(error);
      })

    }
    
  }


  // it inserts the operario in the corrida extrusion
  insertarOperarioCorridaExtrusion(entrada: any, pk_CorridaExtrusion: number){
    

    const operarioCorrida: any = {
      fk_CorridaExtrusion: pk_CorridaExtrusion,
      fk_Operario: entrada.operarioFinal, 
      fechaHora: entrada.fechaFinal,
    }

    this._operarioService.saveOperarioCorridaExtrusion(operarioCorrida).subscribe(data => {
      this.toastr.success('La corrida fue finalizada con exito', 'Corrida registrada');

      
      if (this._operarioService.OperarioActulizarFinalizar) {
        this._operarioService.OperarioActulizarFinalizar = false;  
      }else{
        this._operarioService.OperarioActulizarFinalizar = true;
      }

      this._corridaService.AceptarMaterialSalida = false;
      this._corridaService.AceptarRetalExtrusion = false;
      this._corridaService.AceptarTiempoParo = false;
      this._corridaService.AceptarObservacion = false;
      this._corridaService.AceptarTorta = false;
      this._corridaService.AceptarDevolucion = false;
      this._corridaService.AceptarRetal = false;
      this._corridaService.AceptarTorta = false;
      this._corridaService.AceptarMPri = false;


      this._corridaService.CorridaExtrusionFinalDesactivar = false;
      this._corridaService.InformacionActualizarInicioFinal = false;


      if (this._corridaService.InformacionActualizar) {
        this._corridaService.InformacionActualizar = false;  
      }else{
        this._corridaService.InformacionActualizar = true;  
      }
      this._corridaService.OperarioCorridaExtrusionFinal = entrada;


      this._devolucionService.iniciarMostrarDevolucionExtrusion = true;


      if (this._devolucionService.DevolucionActualizar) {
        this._devolucionService.DevolucionActualizar = false  
      }else{
        this._devolucionService.DevolucionActualizar = true  
      }

      this._corridaService.CorridaExtrusionFinalDesactivar = false;

      this._corridaService.boton = true;
      
      if (this._corridaService.IngresarNuevaCorrida) {
        this._corridaService.IngresarNuevaCorrida = false  
      }else{
        this._corridaService.IngresarNuevaCorrida = true  
      }

      // I change that of here 'cause they will allow me to enable the button of the start Corrida Extrusion
      this._corridaService.CorridaExtrusionFinal = false

      this.form.reset();
    }, error => {
      this.toastr.error('Ha ocurrido un error, la corrida no pudo ser finalizada','Error');
      console.log(error);
    })
  }

  // This function close the component of Corrida Extrusion Final
  cancelarCorridaExtrusionFinal(){
    this.cambio.emit(false);
    this.cortina[0].style.visibility = 'hidden';
    (<HTMLInputElement>document.querySelector("#offcanvasNavbar")).style.zIndex = "1045";
  }

}
