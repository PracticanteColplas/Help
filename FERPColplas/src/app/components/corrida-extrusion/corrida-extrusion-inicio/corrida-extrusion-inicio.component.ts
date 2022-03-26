import { Component, OnInit, ElementRef, HostListener, Output, EventEmitter, OnChanges, Input } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { ToastrService } from 'ngx-toastr';

import { CorridaService } from 'src/app/services/corrida.service';
import { OrdenProduccionService } from 'src/app/services/orden-produccion.service';
import { OperarioService } from 'src/app/services/operario.service';
import { DevolucionService } from 'src/app/services/devolucion.service';
import * as $ from "jquery";

@Component({
  selector: 'app-corrida-extrusion-inicio',
  templateUrl: './corrida-extrusion-inicio.component.html',
  styleUrls: ['./corrida-extrusion-inicio.component.css']
})
export class CorridaExtrusionInicioComponent {


  @Output() cambio = new EventEmitter();
  @Output() activarFinalizarCorrida = new EventEmitter();
  @Output() maquina = new EventEmitter();

  @Input() OperarioCorridaExtrusionInicio: any;
  @Input() ActualizarCorridaExtrusionInicio: any;
  @Input() CorridaNoFinalizada: any;

  isFocusInsideComponent = false;
  isComponentClicked = false;
  public boton : any = true;
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

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>

    // The code of bellow allows me to enable and disable the button of the start Corrida

    this.boton = this._corridaService.boton;


    if (this._corridaService.OperarioCorridaExtrusionInicio.length == undefined) {
      this.boton == true;
    }

    this.proceso = this.route.snapshot.paramMap.get('proceso');

    if (this._corridaService.DatosCorridaNoFinalizada.length > 0) {
      this.boton = true
    }
  
    if (!this._corridaService.CorridaExtrusionFinal) {
      this.boton = false;
    }
    
  }

  listMaquinasCorridaExtrusion : any[] = [
    { nombre: 'CMG1', value: 'CMG1' },
    { nombre: 'CMG2', value: 'CMG2' },
    { nombre: 'CAST', value: 'CAST' },
  ];
  listOrdenProduccion : any[] = [
  ];
  listVOrdenProduccion : any[] = [
  ];
  listOperario : any[] = [
  ];


  form: FormGroup;
  public ordenProduccion: any;
  proceso!: string | null;
  valoresEntrada!: any | null;


  constructor(

    private fb: FormBuilder,
    private _operarioService: OperarioService,
    private _ordenProduccionService: OrdenProduccionService,
    private _corridaService: CorridaService,
    private _devolucionService: DevolucionService,
    private route : ActivatedRoute,
    private toastr: ToastrService,
    private eRef: ElementRef,

    ) {

    this.form = this.fb.group({
      fechaInicial: ['', [Validators.required]],
      operarioIncial: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(1)]],
      tiempoAjuste: ['', [Validators.required]],
      maquina: ['', [Validators.required]],})
  }

  // This function save the Corrida Extrusion
  guardarCorridaExtrusion(){

    const entrada: any = {
      fechaInicial: this.form.get('fechaInicial')?.value,
      operarioIncial: this.form.get('operarioIncial')?.value,
      tiempoAjuste: this.form.get('tiempoAjuste')?.value,
      maquina: this.form.get('maquina')?.value,
    }

    this.buscarOperarioCorridaExtrusion(entrada)
   
  }

  buscarOperarioCorridaExtrusion(entrada){

    this._operarioService.getOperario(entrada.operarioIncial).subscribe(data => {
      
    // console.log(data);
    if (data.length == 0) {
      this.toastr.error('Imposible iniciar corrida el operario no existe', 'Error al iniciar corrida');
    }else{
      this.valoresEntrada = entrada;

      this.ordenProduccion = this.route.snapshot.paramMap.get('ordenProduccion');
      this.proceso = this.route.snapshot.paramMap.get('proceso');
  
  
      const corrida: any = {
        fk_OrdenProduccion: this.ordenProduccion,
        tiempoAjuste: entrada.tiempoAjuste,
  
      }
  
      var valor;
      this.buscarOrdenProduccion(entrada);
      this.obtenerDevolucion();
    }
    

    }, error => {
      console.log(error);
    })
  }
  

  buscarOrdenProduccion(entrada: any){
    const ordenProduccion: any = {
      numeroOrdenProduccion: this.ordenProduccion,
    }

    // it obtains the orden de produccion
    this._ordenProduccionService.getOrdenProduccion( ordenProduccion.numeroOrdenProduccion ).subscribe(data => {
      this.listOrdenProduccion = data;
      

      for (const key in this.listOrdenProduccion[0]) {
        this.listVOrdenProduccion.push(this.listOrdenProduccion[0][key])
      }

      const corrida: any = {
        pk_CorridaExtrusion: 0,
        fk_OrdenProduccion: this.listVOrdenProduccion[0][0].pk_OrdenProduccion,
        tiempoAjuste: entrada.tiempoAjuste,
        maquina: entrada.maquina,
        estado: true,
      }

      // The code that start with window allows me to save the data in the local storage for restart the page and start the corrida in the same way
      var valorOperarioInicio : any = null;

      var datos : any;
      datos = corrida;

      window.onbeforeunload = function() {
        localStorage.setItem("datos", JSON.stringify(datos));
        localStorage.setItem("entrada", JSON.stringify(entrada));
        localStorage.setItem("insertar", JSON.stringify(true));
      }

      // Look that's the code that restart the page
      window.location.reload();  

     
        

    }, error => {
      console.log(error);
    })

  }

  cancelarCorridaExtrusionInicio(){
    this.cambio.emit(false);
    this.cortina[0].style.visibility = 'hidden';
    (<HTMLInputElement>document.querySelector("#offcanvasNavbar")).style.zIndex = "1045";
  }



  // it gets all devolucions in the orden de produccion
  obtenerDevolucion(){
    this.ordenProduccion = this.route.snapshot.paramMap.get('ordenProduccion')?.toString();
    this._devolucionService.countDevoluciones(this.ordenProduccion).subscribe(data => {

      this._devolucionService.DevolucionOrdenProduccion = data;

      for (let index = 0; index < data.length; index++) {


        // it makes a sum for all cantidadConsumida in a specific orden produccion
        this._devolucionService.DevolucionTotal = this._devolucionService.DevolucionTotal + data[index].cantidadConsumida;

        // it makes a sum for all cantidadConsumida in a specific orden produccion grouped into branches
        if (this._devolucionService.DevolucionCantidadTotal[data[index].fk_MPri] == undefined) {
          this._devolucionService.DevolucionCantidadTotal[data[index].fk_MPri] = data[index].cantidadConsumida;
        }else{
          var valor = this._devolucionService.DevolucionCantidadTotal[data[index].fk_MPri];
          this._devolucionService.DevolucionCantidadTotal[data[index].fk_MPri] = valor + data[index].cantidadConsumida;
        }

        if (this._devolucionService.DevolucionPkDescripcion[data[index].fk_MPri] == undefined) {
          this._devolucionService.DevolucionPkDescripcion[data[index].fk_MPri] = data[index].descripcion;
        }


      }

      // it allows to devolucion component make a updating
      if (this._devolucionService.DevolucionActualizar) {
        this._devolucionService.DevolucionActualizar = false
      }else{
        this._devolucionService.DevolucionActualizar = true
      }

    }, error => {
      console.log(error);
    })
  }

}
