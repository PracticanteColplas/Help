import { Component, OnInit, Input, ElementRef, HostListener, EventEmitter, Output, OnChanges} from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

import { RetalService } from 'src/app/services/retal.service';
import { CorridaService } from 'src/app/services/corrida.service';
import { MaterialService } from 'src/app/services/material.service';
import { DevolucionService } from 'src/app/services/devolucion.service';
import { ConsumoMPriExtrusionService } from 'src/app/services/consumo-mpri-extrusion.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-retal-ingresar',
  templateUrl: './retal-ingresar.component.html',
  styleUrls: ['./retal-ingresar.component.css']
})
export class RetalIngresarComponent implements OnInit {

  form: FormGroup;

  @Output() cambio = new EventEmitter();
  @Input() RetalExtrusionPermiso: any;
  @Input() AceptarRetal: any;

  isFocusInsideComponent = false;
  isComponentClicked = false;
  contador: any = 0;

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
    public _retalService: RetalService,
    public _corridaService: CorridaService,
    private eRef: ElementRef,
    private toastr: ToastrService,
    private _materialService: MaterialService, 
    private _devolucionService: DevolucionService, 
    private _consumoMPriExtrusionService: ConsumoMPriExtrusionService, 
  ) { 
    
  }

  Retal : any[] = [
  ];
  RetalPk : any[] = [
  ];
  RetalPkUtilizar : any[] = [
  ];
  entrada : any[] = [
  ];
  datos: any;
  CorridasExtrusion : any[] = [
  ];
  checkSeleccionado : any[] = [
  ];
  activarBoton : boolean = true;
  cortina: any;
  ListaRetalesColumnas : any[] = [
  ];
  
  ngOnInit(): void {
    this.cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>

    
    this.obterMaterialRetalExtrusion();
   
  }

  // This function gets the data of RetalExtrusion
  obterMaterialRetalExtrusion(){
    this._retalService.getRetalExtrusion().subscribe(data => {
      this.Retal = data.message;


      this.organizarDataMostrar(this.Retal);

      for (const key in this.Retal) {
        this.RetalPkUtilizar.push(this.Retal[key].pk_RetalExtrusion)
      }

      this.form = this.fb.group({
      }) 
      for (let index = 0; index < this.RetalPkUtilizar.length; index++) {
        this.form.addControl(this.RetalPkUtilizar[index], new FormControl('', []));
      }
      
      this.form.reset();
    }, error => {
      console.log(error);
    })
  }

  // This function allows to enable the input after select the checkbox
  onChange(retalExtrusionPk:number, event: Event ) {

    if (this.RetalPk.indexOf(retalExtrusionPk) == -1) {
      this.RetalPk.push(retalExtrusionPk) 
      
    }else{
      this.RetalPk.splice(this.RetalPk.indexOf(retalExtrusionPk), 1) 
    }

    if (this.RetalPk.length > 0) {
      this.activarBoton = false;
    }

    if (this.RetalPk.length == 0) {
      this.activarBoton = true;
    }

    this.checkSeleccionado[0] = event;

    if (this.checkSeleccionado[0].target.checked) {
      this.form.controls[retalExtrusionPk.toString()].setValidators([Validators.required]);
      this.form.controls[retalExtrusionPk.toString()].enable();
    }else{
      this.form.controls[retalExtrusionPk.toString()].setValidators([]);
      this.form.controls[retalExtrusionPk.toString()].reset();
      this.form.controls[retalExtrusionPk.toString()].disable();
    }
  }

  onChangeValor(item:number){

  }

  // this function save the data of Retal
  guardarRetal(){

    try {
      this.CorridasExtrusion.push(this._corridaService.DatosCorridaNoFinalizada)  
      this.CorridasExtrusion.push(this._corridaService.CorridaExtrusion)  
      

    } catch (error) {
      
    }
    
    for (let index = 0; index < this.RetalPk.length; index++) {

     
      const control = this.form.get(this.RetalPk[index].toString())?.value;
      const control1 = this.RetalPk[index];

      this._retalService.RetalExtrusionTotal = this._retalService.RetalExtrusionTotal + control;

      

      
      if (this._corridaService.CorridaExtrusion) {

        var pk: any;

        if (this._corridaService.CorridaNoFinalizadaActivar) {
          pk = this.CorridasExtrusion[0][2][0][0].pk_CorridaExtrusion

        }else{
          pk = this.CorridasExtrusion[1].pk_CorridaExtrusion
        }

        if (control != null) {
          this.datos = {
            Fk_RetalExtrusion: control1,
            Fk_CorridaExtrusion: pk,
            Cantidad: control,
          }  
        }


        this._retalService.saveRetalExtrusionCantidad(this.datos).subscribe(data => {

          this.toastr.success('El retal fue insertado con exito', 'Retal insertado');

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
    }
  }

   // this function sorts the elements that will go to show 
   organizarDataMostrar(Retal: any){

    var primeraList : any[] = [
    ];
    var segundaList : any[] = [
    ];
    var terceraList : any[] = [
    ];
    var cuartaList : any[] = [
    ];

    for (var index = 1; index < this.Retal.length + 1; index++) {
      // it's with 3 'cause i will only show 3 columns
      var valor = parseFloat((index % 3 ).toFixed(1));

      if ( valor == 1 ) {
        primeraList.push(this.Retal.slice(index - 1)[0]);

        if (this.ListaRetalesColumnas[0]) {
  
          if  (JSON.stringify(this.ListaRetalesColumnas).includes( JSON.stringify(primeraList).slice(1, -1) ) ) {
          }else{
            this.ListaRetalesColumnas[0].push(primeraList[0])
          }
          
        }else{
          this.ListaRetalesColumnas[0] = primeraList;
        }
  
      }

      if ( valor == 2 ) {
  
        segundaList.push(this.Retal.slice(index - 1)[0]);
        if (this.ListaRetalesColumnas[1]) {
  
          if  (JSON.stringify(this.ListaRetalesColumnas).includes( JSON.stringify(segundaList).slice(1, -1) )) {
          }else{
            this.ListaRetalesColumnas[1].push(segundaList[0])
          }
          
        }else{
          this.ListaRetalesColumnas[1] = segundaList;
        }
      }
      if ( valor == 0  ) {      
        
        terceraList.push(this.Retal.slice(index - 1)[0]);
  
        if (this.ListaRetalesColumnas[2]) {
  
          if  (JSON.stringify(this.ListaRetalesColumnas).includes( JSON.stringify(terceraList).slice(1, -1) )) {
          }else{
            this.ListaRetalesColumnas[2].push(terceraList[0])
          }
          
        }else{
          this.ListaRetalesColumnas[2] = terceraList;
        }
      }
      
    }
    

  }

  // This function's work is disable this component when you press the buttom cancel
  cancelarRetalIngresar(){
    this.cambio.emit(false);

    this.cortina[0].style.visibility = 'hidden';
    
  }

  
}
