import { Component, OnInit, Input, ElementRef, HostListener, EventEmitter, Output, OnChanges} from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

import { MPriExtrusionService } from 'src/app/services/mpri-extrusion.service';
import { ConsumoMPriExtrusionService } from 'src/app/services/consumo-mpri-extrusion.service';
import { DevolucionService } from 'src/app/services/devolucion.service';

import { MaterialService } from 'src/app/services/material.service';
import { RetalService } from 'src/app/services/retal.service';

import { ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-devolucion-ingresar',
  templateUrl: './devolucion-ingresar.component.html',
  styleUrls: ['./devolucion-ingresar.component.css']
})
export class DevolucionIngresarComponent implements OnInit {

  form: FormGroup;
  pitanjeForm: FormGroup;
  contador: any = 0;

  @Output() cambio = new EventEmitter();
  @Input() DevolucionPermiso: any;
  @Input() devolucionIngresarPermiso: any;

  isFocusInsideComponent = false;
  isComponentClicked = false;

  p = 1;
  pageSize = 7; 
  page = 4;

  inputValue = "";

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.contador == 0 || this.eRef.nativeElement.contains(event.target) ) {
      this.contador += 1;
      this.isComponentClicked = true;
      this.isFocusInsideComponent = true;
    } else {
      this.contador += 1;
      this.cambio.emit(false)
      this.isComponentClicked = false;
      this.isFocusInsideComponent = false;

      this.cortina[0].style.visibility = 'hidden';
    }
  }

  constructor(
    private fb: FormBuilder,    
    public _mPriExtrusionService: MPriExtrusionService,
    public _consumoMPriExtrusionService: ConsumoMPriExtrusionService,
    public _devolucionService: DevolucionService,
    public _retalService: RetalService,
    public _materialService: MaterialService,
    private route : ActivatedRoute, 
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
  activarBoton : boolean = true;
  public ordenProduccion: any;
  DevolucionesOrden : any[] = [
  ];
  cortina: any;
  
  ngOnInit(): void {
    this.cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>

    this._mPriExtrusionService.getMPriExtrusion().subscribe(data => {
      this.MPri = data.message;
      this.MPri2 = data;


      for (const key in this.MPri) {
        this.descripcionPk[this.MPri[key].descripcion] = this.MPri[key].pk_CodigoProducto
        this.MPriPkUtilizar.push(this.MPri[key].pk_CodigoProducto)
      }


      this.form = this.fb.group({
      }) 

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

    this.ordenProduccion = this.route.snapshot.paramMap.get('ordenProduccion');

    var nEntrada: any = [];
    for (const key in this.entrada) {
      const datos: any = {
        fk_OrdenProduccion: this.ordenProduccion,
        fk_MPri: key,
        cantidad: this.entrada[key],
      }

      nEntrada.push(datos)
  
    }

    for (let index = 0; index < nEntrada.length; index++) {
      
      if (nEntrada[index].cantidad != 0) {
        this.InsertarConsumoMPriExtrusion(nEntrada[index])
     
      }
      
    }
    

    this.obtenerDevolucion();
  }

  InsertarConsumoMPriExtrusion(entrada: any){
    // It inserts the data of another devolucion
    this._devolucionService.saveDevolucionService(entrada).subscribe(data => {
      this.toastr.success('La devolucion fue insertada con exito', 'Devolucion insertada');


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

      this.form.reset();
    }, error => {
      console.log(error);
    })

    
  }

  // The code of bellow get all in devolucion of one Orden Produccion
  obtenerDevolucion(){
    this.ordenProduccion = this.route.snapshot.paramMap.get('ordenProduccion')?.toString();
    this._devolucionService.countDevoluciones(this.ordenProduccion).subscribe(data => {      
      this._devolucionService.DevolucionOrdenProduccion = data;


      if (this._devolucionService.DevolucionCantidadTotal.length > 0 ) {
        this._devolucionService.DevolucionCantidadTotal = []
      }

      if (this._devolucionService.DevolucionTotal > 0) {
        this._devolucionService.DevolucionTotal = 0
      }


      for (let index = 0; index < data.length; index++) {
        
        this._devolucionService.DevolucionTotal = this._devolucionService.DevolucionTotal + data[index].cantidadConsumida;

        if (this._devolucionService.DevolucionCantidadTotal[data[index].fk_MPri] == undefined) {
          this._devolucionService.DevolucionCantidadTotal[data[index].fk_MPri] = data[index].cantidadConsumida;  
        }else{
          var valor = this._devolucionService.DevolucionCantidadTotal[data[index].fk_MPri];
          this._devolucionService.DevolucionCantidadTotal[data[index].fk_MPri] = valor + data[index].cantidadConsumida;  
        }  
      }


      if (this._devolucionService.DevolucionActualizar) {
        this._devolucionService.DevolucionActualizar = false  
      }else{
        this._devolucionService.DevolucionActualizar = true  
      }
      
    }, error => {
      console.log(error);
    })
  }


  // This function disable the component in MPriIngresar
  cancelarMPriIngresar(){
    this.cambio.emit(false);
    this.cortina[0].style.visibility = 'hidden';
  }

}
