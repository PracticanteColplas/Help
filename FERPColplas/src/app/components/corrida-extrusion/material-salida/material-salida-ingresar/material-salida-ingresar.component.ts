import { Component, OnInit, Input, ElementRef, HostListener, EventEmitter, Output} from '@angular/core';

import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { CorridaService } from 'src/app/services/corrida.service';
import { MaterialService } from 'src/app/services/material.service';

import { ConsumoMPriExtrusionService } from 'src/app/services/consumo-mpri-extrusion.service';
import { DevolucionService } from 'src/app/services/devolucion.service';
import { RetalService } from 'src/app/services/retal.service';

import { ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-material-salida-ingresar',
  templateUrl: './material-salida-ingresar.component.html',
  styleUrls: ['./material-salida-ingresar.component.css']
})
export class MaterialSalidaIngresarComponent {
  form: FormGroup;
  @Input() materialSalidaPermiso: any;
  CorridasExtrusion : any[] = [
  ];
  MaterialSalida : any[] = [
  ];

  // This variable is for the html component of material salida in select ubicacionNumeroLetra
  MaterialSalidaUbicacionNumeroLetra : any[] = [
    { nombre: 'A', valor: 'A' },
    { nombre: 'B', valor: 'B' },
    { nombre: 'C', valor: 'C' },
  ];
  MaterialSalidaUbicacionNumeroNumero : any[] = [
  ];

  opcionSeleccionado: string = '0';
  verSeleccion: string = '';
  
  NoLote!: string | null;
  ordenProduccion!: string | undefined;
  public valor : any;

  @Output() cambio = new EventEmitter();

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
      this.cambio.emit(false)
      this.isComponentClicked = false;
      this.isFocusInsideComponent = false;

      this.cortina[0].style.visibility = 'hidden';
    }
  }

  constructor(
    private fb: FormBuilder, 
    private _corridaService: CorridaService,
    private _materialService: MaterialService,
    private _consumoMPriExtrusionService: ConsumoMPriExtrusionService,
    private _devolucionService: DevolucionService,
    private _retalService: RetalService,
    private route : ActivatedRoute, 
    private toastr: ToastrService,
    private eRef: ElementRef,
    ) 
  { 
    this.form = this.fb.group({
      pesoNetoRollo: ['', [Validators.required]], 
      ubicacionNumeroLetra: ['', [Validators.required]], 
      ubicacionNumeroNumero: ['', [Validators.required]], 
    }) 
  }

  ngOnChanges(): void { 
    this.cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>

    try {
      
      this.CorridasExtrusion.push(this._corridaService.DatosCorridaNoFinalizada)  

      this.CorridasExtrusion.push(this._corridaService.CorridaExtrusion) 
      
    } catch (error) {
      
    }
  }

  // Saves the Material salida
  guardarMaterialSalida(){
    this.ordenProduccion = this.route.snapshot.paramMap.get('ordenProduccion')?.toString();
    this.valor = this.route.snapshot.paramMap.get('ordenProduccion')?.toString();

      // Brings the last Material Salida Extrusion
    this._materialService.countMaterialSalidaExtrusion(this.valor.toString()).subscribe(data => {


      if (data[0][0] == null) {

        // Makes the consecutive value for each material salida
        var consecutivo = 1;

        // Delete all letters in the ordenProduccion identification
        this.NoLote = this.valor.replace(/[a-zA-Z ]/g, "") +"-"+ consecutivo.toString();


        var pk: any;

        if (this._corridaService.CorridaNoFinalizadaActivar) {
          pk = this.CorridasExtrusion[0][2][0][0].pk_CorridaExtrusion

        }else{
          pk = this.CorridasExtrusion[1].pk_CorridaExtrusion
        }
        

        const entrada: any = {
          fk_CorridaExtrusion: pk,
          pesoNetoRollo: this.form.get('pesoNetoRollo')?.value,
          noLote: this.NoLote,
          ubicacionNumero: this.form.get('ubicacionNumeroNumero')?.value + this.form.get('ubicacionNumeroLetra')?.value,
        }
  
        this.InsertarMaterialSalida(entrada)
      }else{

        var consecutivo = parseInt(data[0][0].noLote.substr(data[0][0].noLote.indexOf('-') + 1, )) + 1;

        this.NoLote = this.valor.replace(/[a-zA-Z ]/g, "") +"-"+ consecutivo.toString();
        

        var pk: any;

        if (this._corridaService.CorridaNoFinalizadaActivar) {
          pk = this.CorridasExtrusion[0][2][0][0].pk_CorridaExtrusion

        }else{
          pk = this.CorridasExtrusion[1].pk_CorridaExtrusion
        }

        var dateDay1 = Date.now();
        var dateDay2 = new Date(dateDay1);

        var fechaActual = this.obtenerFechaActual(dateDay2);

       
       
        // console.log(fechaActual);
        // console.log(dateDay2.toISOString());
        


        const entrada: any = {
          fk_CorridaExtrusion: pk,
          pesoNetoRollo: this.form.get('pesoNetoRollo')?.value,
          noLote: this.NoLote,
          ubicacionNumero: this.form.get('ubicacionNumeroNumero')?.value + this.form.get('ubicacionNumeroLetra')?.value,
          fechaIngreso: fechaActual
        }
  
        this.InsertarMaterialSalida(entrada)
        
      }
      
      
      this.form.reset();
    }, error => {
      console.log(error);
    })
  }

  obtenerFechaActual(dateDay2){
    var formatoFecha: string = '';
    const formatoMap = {
      dd: dateDay2.getDate(),
      mm: dateDay2.getMonth() + 1,
      yyyy: dateDay2.getFullYear(),
      hh: dateDay2.getHours(),
      mn: dateDay2.getMinutes(),
      ss: dateDay2.getSeconds(),
      sss: dateDay2.getMilliseconds(),
    };

    // console.log(dateDay2.getMilliseconds());
    
    formatoFecha += formatoMap.yyyy;

    if (formatoMap.mm < 10) {
      formatoFecha += '-0' +formatoMap.mm;
    } else {
      formatoFecha += '-' +formatoMap.mm;
    }
    if (formatoMap.dd < 10) {
      formatoFecha += '-0' +formatoMap.dd;
    } else {
      formatoFecha += '-' +formatoMap.dd;
    }
    if (formatoMap.hh < 10) {
      formatoFecha += 'T0' +formatoMap.hh;
    } else {
      formatoFecha += 'T' +formatoMap.hh;
    }
    if (formatoMap.mn < 10) {
      formatoFecha += ':0' +formatoMap.mn;
    } else {
      formatoFecha += ':' +formatoMap.mn;
    }
    if (formatoMap.ss < 10) {
      formatoFecha += ':0' +formatoMap.ss;
    } else {
      formatoFecha += ':' +formatoMap.ss;
    }
    if (formatoMap.sss < 10) {
      formatoFecha += '.00' +formatoMap.sss+"Z";
    } else {
      if (formatoMap.sss < 100) {
        formatoFecha += '.0' +formatoMap.sss+"Z";
      }else{
        formatoFecha += '.' +formatoMap.sss+"Z";
      }
      
    }

    return formatoFecha;
  }

  // formatoFecha(fecha, formato) {
  //   const map = {
  //       dd: fecha.getDate(),
  //       mm: fecha.getMonth() + 1,
  //       yy: fecha.getFullYear().toString().slice(-2),
  //       yyyy: fecha.getFullYear()
  //   }

  //   return formato.replace(/dd|mm|yy|yyy/gi, matched => map[matched])
  // }

  // Inserts the material salida
  InsertarMaterialSalida(entrada: any){

    console.log(entrada);
    

    this._materialService.saveMaterialSalidaExtrusion(entrada).subscribe(data => {

      this.toastr.success('El material de salida fue insertado con exito', 'Material salida insertado');

      this._materialService.MaterialSalidaTotal =  this._materialService.MaterialSalidaTotal + parseInt(entrada.pesoNetoRollo);

      if (this._materialService.MaterialSalidaActualizar) {
        this._materialService.MaterialSalidaActualizar = false  
      }else{
        this._materialService.MaterialSalidaActualizar = true  
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

  // Cancel the component material salida ingresar
  cancelarMaterialSalidaIngresar(){
    this.cambio.emit(false);
    this.cortina[0].style.visibility = 'hidden';
    
  }

  // Makes a range using three elements, strat, stop and step.
  range(start = 0, stop = 0, step = 0) {
    var a = [start], b = start;
    while (b < stop) {
      a.push(b += step || 1);
    }
    return a;
  }

  capturar(value: any) {
    // That's for pass the value to the variable verSeleccion
    if (value == 'A') {
      this.MaterialSalidaUbicacionNumeroNumero = [];
      this.MaterialSalidaUbicacionNumeroNumero = this.range(1, 30, 1);
    }
    if (value == 'B') {
      this.MaterialSalidaUbicacionNumeroNumero = [];
      this.MaterialSalidaUbicacionNumeroNumero = this.range(1, 30, 1);
    }
    if (value == 'C') {
      this.MaterialSalidaUbicacionNumeroNumero = [];
      this.MaterialSalidaUbicacionNumeroNumero = this.range(1, 30, 1);
    }
  }

}
