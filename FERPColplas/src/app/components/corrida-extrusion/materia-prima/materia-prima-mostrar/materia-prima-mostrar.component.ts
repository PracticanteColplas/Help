import { Component, OnInit, Input, ElementRef, HostListener, EventEmitter, Output, OnChanges} from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

import { RetalService } from 'src/app/services/retal.service';
import { CorridaService } from 'src/app/services/corrida.service';
import { MPriExtrusionService } from 'src/app/services/mpri-extrusion.service';
import { ConsumoMPriExtrusionService } from 'src/app/services/consumo-mpri-extrusion.service';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';


@Component({
  selector: 'app-materia-prima-mostrar',
  templateUrl: './materia-prima-mostrar.component.html',
  styleUrls: ['./materia-prima-mostrar.component.css']
})
export class MateriaPrimaMostrarComponent implements OnChanges {

  form: FormGroup;

  @Output() cambio = new EventEmitter();
  @Input() ConsumoMPriActualizar: any;
  @Input() nuevo: any;

  isFocusInsideComponent = false;
  isComponentClicked = false;
  contador: any = 0;

  p = 1;
  pageSize = 1; 
  page = 4;

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

  onPageChange(e)
  {
    if (e){
      this.p = e;
    }
      
  }
  paginaSiguiente(){

    var limite: any = 0;

    var valor = this.consumoMPriExtrusion.length / this.pageSize;
    var valorRestar = this.consumoMPriExtrusion.length % this.pageSize;

    if (valorRestar != 0) {
      var nuevoValor = this.consumoMPriExtrusion.length - valorRestar  
      limite = (nuevoValor / 7) + 1;
    }else{
      limite =  this.consumoMPriExtrusion.length / this.pageSize;
    }    

    if (this.p < limite) {
      this.p += 1;  
    }
    
  }
  paginaAnterior(){
    if (this.p > 1) {
      this.p -= 1;  
    }
    
  }

  constructor(
    private fb: FormBuilder,    
    public _retalService: RetalService,
    public _corridaService: CorridaService,
    public _mPriExtrusionService: MPriExtrusionService,
    public _consumoMPriExtrusionService: ConsumoMPriExtrusionService,
    private eRef: ElementRef,
  ) { 
    
  }

  i : any;
  a : any;

  entrada : any[] = [
  ];


  CorridasExtrusion: any;
  CorridasExtrusionA : any[] = [
  ];
  activarBoton : boolean = true;
  valor : any;
  numeroDatos : any;
  iniciarEditarMPriExtrusion!: boolean | false;

  consumoMPriExtrusion : any[] = [];
  cortina: any;


  @Output() cambioEditarMPriCorridaExtrusion = new EventEmitter();
  @Output() cambioEliminarMPriExtrusion = new EventEmitter();
  
  ngOnChanges(): void {
    

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

    this.obtenerConsumosMPriExtrusion();

    this.cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>

    this.CorridasExtrusion = this._corridaService.CorridaExtrusion;
    this.consumoMPriExtrusion = this._consumoMPriExtrusionService.MPriExtrusionTotalIngresada;


    this.mostrarConsumosMPriExtrusion(this.CorridasExtrusion.pk_CorridaExtrusion);

  }

  mostrarConsumosMPriExtrusion(corrida: number){
    
    if (corrida == undefined) {
      this.valor = 0
    }else{
      this.valor = corrida
    }

  }

  obtenerConsumosMPriExtrusion(){

    try {
      this._consumoMPriExtrusionService.getConsumosMPriExtrusion(this.CorridasExtrusionA[0].pk_CorridaExtrusion).subscribe(data => {

        if (data.length != 0) {
          this.ordenarConsumosMPriExtrusion(data);
          
          this._corridaService.CorridaExtrusionFinalDesactivar = false;
        }else{
          this._corridaService.CorridaExtrusionFinalDesactivar = true; 
        }
      }, error => {
        console.log(error);
      })  
    } catch (error) {
      
    }
    
  }

  array1: any = [];
  ordenarConsumosMPriExtrusion(data: any){
    this.array1 = [];
    var array2: any = [];

    if (this.array1.length == 0) {
      array2.push(data[0])
      this.array1.push(array2)
    }

    for (let index = 0; index < data.length; index++) {
      var existe = false;
      var iguales = false;
      var donde: any = 0;
      var dondeN: any = [];


      for (let e = 0; e < this.array1.length; e++) {

        for (let a = 0; a < this.array1[e].length; a++) {  
          if (this.array1[e][a] == data[index]) {      
            iguales = true;
          }

          if (this.array1[e][a].pk_ConsumoMPriExtrusion != data[index].pk_ConsumoMPriExtrusion) {
            if (this.array1[e][a].descripcion == data[index].descripcion) {
              existe = true;
              donde = e;
            } 
            if (this.array1[e][a].descripcion != data[index].descripcion) {
              dondeN.push(e);
            }   
          }else{
          }
                    
        }

      }

      if (existe) {
        if (iguales == false) {
          var nuevo_array: any = [];
          nuevo_array.push(data[index]);
    
          if (this.array1[donde + 1] == undefined) {
            this.array1[donde + 1] = nuevo_array; 
          }else{
            this.array1[donde + 1].push(data[index]);         
          }
        }
        
      }else{
        if (dondeN[0] != undefined) {
          this.array1[ dondeN[0] ].push(data[index]);  
        }
        
      }
      donde = 0
    }

    this.consumoMPriExtrusion = this.array1;

    this._consumoMPriExtrusionService.MPriExtrusionTotalIngresada = this.consumoMPriExtrusion;

  }

  // This function enable the component of Materia prima salida
  editarMateriaPrimaSalida(materiaPrimaCorridaExtrusion: any, b: any, j: any){

    if (this._corridaService.AceptarMPri) {
      this._consumoMPriExtrusionService.MPriExtrusion = materiaPrimaCorridaExtrusion;
      this._consumoMPriExtrusionService.MPriExtrusionCambioB = b;
      this._consumoMPriExtrusionService.MPriExtrusionCambioJ = j;
      this.cambioEditarMPriCorridaExtrusion.emit(true)
      this.iniciarEditarMPriExtrusion = true;
    }
  
  }

  // This function delete the component of materia prima eliminar
  eliminarMateriaPrimaSalida(materiaPrimaCorridaExtrusion: any, b: any, j: any){
    if (this._corridaService.AceptarMPri) {
      this._consumoMPriExtrusionService.MPriEliminar = materiaPrimaCorridaExtrusion;
      this._consumoMPriExtrusionService.MPriExtrusionCambioB = b;
      this._consumoMPriExtrusionService.MPriExtrusionCambioJ = j;

      this.cambioEliminarMPriExtrusion.emit(true)
    }
  }

  // This function disable all the component of Materia Prima Mostrar
  cancelarMateriaPrimaMostrar(){
    this.cambio.emit(false);
    this.cortina[0].style.visibility = 'hidden';
    (<HTMLInputElement>document.querySelector("#offcanvasNavbar")).style.zIndex = "1045";
  }

  // This functions update the data in the view 
  MPriCorridaExtrusionMostrar(entrada: any){
    if (entrada == true) {
      this.iniciarEditarMPriExtrusion = entrada  
    }
  }

  MPriSalidaEditarMostrar_(entrada: any){
    if (entrada == false) {
      this.iniciarEditarMPriExtrusion = entrada  
    }
  }
}
