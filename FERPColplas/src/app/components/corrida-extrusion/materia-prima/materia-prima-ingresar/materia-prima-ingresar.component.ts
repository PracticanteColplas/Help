import { Component, OnInit, Input, ElementRef , HostListener, EventEmitter, Output, OnChanges} from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

import { CorridaService } from 'src/app/services/corrida.service';
import { MPriExtrusionService } from 'src/app/services/mpri-extrusion.service';
import { ConsumoMPriExtrusionService } from 'src/app/services/consumo-mpri-extrusion.service';

import { DevolucionService } from 'src/app/services/devolucion.service';
import { MaterialService } from 'src/app/services/material.service';
import { RetalService } from 'src/app/services/retal.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-materia-prima-ingresar',
  templateUrl: './materia-prima-ingresar.component.html',
  styleUrls: ['./materia-prima-ingresar.component.css']
})
export class MateriaPrimaIngresarComponent implements OnInit {

  form: FormGroup;
  pitanjeForm: FormGroup;
  contador: any = 0;
  inputValue = "";
  ordenesProduccion2: any = [];
  ordenesProduccion: any = [];

  p = 1;
  pageSize = 7; 
  page = 4;

  @Output() cambio = new EventEmitter();
  @Input() TortaExtrusionPermiso: any;
  @Input() MPExtrusionPermiso: any;
  
  
  isFocusInsideComponent = false;
  isComponentClicked = false;
  count : number = 1;
  count2 : number = 0;
  primeraLista : any[] = [];
  segundaLista : any[] = [];

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

  constructor(
    private fb: FormBuilder,    
    public _corridaService: CorridaService,
    public _mPriExtrusionService: MPriExtrusionService,
    public _consumoMPriExtrusionService: ConsumoMPriExtrusionService,
    public _devolucionService: DevolucionService,
    public _materialService: MaterialService,
    public _retalService: RetalService,
    private toastr: ToastrService,
    private eRef: ElementRef,
  ) { 
    
  }

  MPri : any[] = [
  ];
  MPri2 : any[] = [
  ];
  MPriPkUtilizar : any[] = [
  ];
  entrada : any[] = [
  ];
  descripcionPk : any[] = [
  ];
  CorridasExtrusion : any[] = [
  ];
  cortina: any;
  
  ngOnInit(): void {

    this.cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>
    // It makes a consult in a bd and bring all the MPriExtrusion.Descripcion data
    this._mPriExtrusionService.getMPriExtrusion().subscribe(data => {
      this.MPri = data.message;
      this.MPri2 = data;


      for (const key in this.MPri) {
        this.MPriPkUtilizar.push(this.MPri[key].pk_CodigoProducto)
      }

      this._mPriExtrusionService.MateriaPrimaCantidad = this.MPriPkUtilizar.length;

      this.form = this.fb.group({
      }) 

      // it inserts into the form control
      for (let index = 0; index < this.MPriPkUtilizar.length; index++) {
        this.form.addControl(this.MPriPkUtilizar[index], new FormControl('', []));
      }

      this.form.reset();
    }, error => {
      console.log(error);
    })

  }

  onPageChange(e)
  {
    if (e){
      this.p = e;
    }
      
  }
  paginaSiguiente(){
    var limite: any = 0;

    var valorRestar = this.MPri.length % this.pageSize;

    if (valorRestar != 0) {
      var nuevoValor = this.MPri.length - valorRestar  
      limite = (nuevoValor / 7) + 1;
    }else{

      limite = this.MPri.length / this.pageSize;
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


  onInput(value: Event) {

    this.p = 1;
    var nuevoValor = (<HTMLInputElement>value.target).value;

    nuevoValor = nuevoValor.toUpperCase();
    
    var nuevoArray:any = [];
    
    for (let index = 0; index < this.MPri2["message"].length; index++) {

      if (
        (this.MPri2["message"][index]["pk_CodigoProducto"].indexOf(nuevoValor) != -1)|| 
        (this.MPri2["message"][index]["descripcion"].indexOf(nuevoValor) != -1) 
        ) {
        nuevoArray.push(this.MPri2["message"][index])
      }     
     
    }

    this.MPri = nuevoArray;

  }

  guardarConsumoMPri(){

    try {

      if (this._corridaService.DatosCorridaNoFinalizada.length > 0) {
        this.CorridasExtrusion.push(this._corridaService.DatosCorridaNoFinalizada[2][0][0])  
      }else{
        this.CorridasExtrusion.push(this._corridaService.CorridaExtrusion)  
      }
      
    } catch (error) {
      
    }


    // Gets all the data input and saves it into a list
    for (let index = 0; index < this.MPriPkUtilizar.length; index++){

      var valor;
      
      if (this.form.get(this.MPriPkUtilizar[index].toString())?.value == null) {
        valor = 0
      }else{
        valor = this.form.get(this.MPriPkUtilizar[index].toString())?.value;
      }
      this.entrada[this.MPriPkUtilizar[index]] = valor;
      
    }
    
    const datos: any = {
    }


    for (const key in this.entrada) {
      if (this.entrada[key] != 0) {
        

        const datos: any = {
          fk_CorridaExtrusion: this.CorridasExtrusion[0].pk_CorridaExtrusion,
          fk_MPri: key,
          cantidadConsumida: this.entrada[key],
        }

        
        this.InsertarConsumoMPriExtrusion(datos)

      }
       
    }

    this.toastr.success('La materia prima ha sido registrada correctamente', 'Materia prima registrada');


  }

  InsertarConsumoMPriExtrusion(entrada: any){

    this._consumoMPriExtrusionService.saveConsumoMPriExtrusion(entrada).subscribe(data => {
      
      // console.log("hola mundito")

      // Makes the sums for all data from ConsumoMPriExtrusion
      if (this._consumoMPriExtrusionService.MPriExtrusionCantidadTotal[entrada.fk_MPri] == undefined) {
        this._consumoMPriExtrusionService.MPriExtrusionCantidadTotal[entrada.fk_MPri] = entrada.cantidadConsumida;  
      }else{
        var valor = this._consumoMPriExtrusionService.MPriExtrusionCantidadTotal[entrada.fk_MPri];
        this._consumoMPriExtrusionService.MPriExtrusionCantidadTotal[entrada.fk_MPri] = valor + entrada.cantidadConsumida;  
      }

      if(this.count % 3 == 0){
        this.segundaLista.push(data);
        this._consumoMPriExtrusionService.MPriExtrusionTotalIngresada.push(this.segundaLista);
        this.primeraLista.push(this.segundaLista);
        this.segundaLista = [];
        this.count = 1;

      }else{

        this.segundaLista.push(data);
        this.count = this.count + 1;
      }
    

      // Update the view ConsumoMPriActualizar
      if (this._consumoMPriExtrusionService.ConsumoMPriActualizar) {
        this._consumoMPriExtrusionService.ConsumoMPriActualizar = false;
      }else{
        this._consumoMPriExtrusionService.ConsumoMPriActualizar = true;
      }

      if (this._devolucionService.DevolucionActualizar) {
        this._devolucionService.DevolucionActualizar = false  
      }else{
        this._devolucionService.DevolucionActualizar = true  
      }

      if (this._materialService.MaterialSalidaActualizar) {
        this._materialService.MaterialSalidaActualizar = false  
      }else{
        this._materialService.MaterialSalidaActualizar = true  
      }

      if (this._retalService.RetalExtrusionActualizar) {
        this._retalService.RetalExtrusionActualizar = false  
      }else{
        this._retalService.RetalExtrusionActualizar = true  
      }


      this._consumoMPriExtrusionService.MPriExtrusionTotal = this._consumoMPriExtrusionService.MPriExtrusionTotal + entrada.cantidadConsumida;

      // console.log(this._consumoMPriExtrusionService.MPriExtrusionTotal);

      this.form.reset();
    }, error => {
      console.log(error);
    })

  }

  // This function disable the component of MPriIngresar 
  cancelarMPriIngresar(){
    this.cambio.emit(false);
    this.cortina[0].style.visibility = 'hidden';
    (<HTMLInputElement>document.querySelector("#offcanvasNavbar")).style.zIndex = "1045";
  }

}
