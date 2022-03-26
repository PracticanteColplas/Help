
import { Component, Inject, OnInit, Input, ElementRef, HostListener, EventEmitter, Output, OnChanges} from '@angular/core';

import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { CorridaService } from 'src/app/services/corrida.service';
import { ReprocesoService } from 'src/app/services/reproceso.service';

import { ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-reproceso-ingresar',
  templateUrl: './reproceso-ingresar.component.html',
  styleUrls: ['./reproceso-ingresar.component.css']
})
export class ReprocesoIngresarComponent implements OnChanges {

  form: FormGroup;
  @Input() ReprocesoPermiso: any;
  CorridasExtrusion : any[] = [
  ];
  MaterialSalida : any[] = [
  ];
  ReprocesoUbicacionTipo : any[] = [
    { nombre: 'IMPRESION', valor: 'IMPRESION' },
    { nombre: 'REFILADO', valor: 'REFILADO' },
    { nombre: 'EXTRUSION', valor: 'EXTRUSION' },
    { nombre: 'RETAL', valor: 'RETAL' },
    { nombre: 'COMPLETADO', valor: 'COMPLETADO' },
  ];
  ReprocesoUbicacionNumeroLetra : any[] = [
    { nombre: 'A', valor: 'A' },
    { nombre: 'B', valor: 'B' },
    { nombre: 'C', valor: 'C' },
  ];
  ReprocesoUbicacionNumeroNumero : any[] = [
  ];

  opcionSeleccionado: string = '0';
  verSeleccion: string = '';
  
  NoLote!: string | null;
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
    private _reprocesoService: ReprocesoService,
    private route : ActivatedRoute, 
    private eRef: ElementRef,
    private toastr: ToastrService,
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

  // This function connect with anothers functions one of them is the function that insert the data
  guardarReproceso(){

    this.valor = this.route.snapshot.paramMap.get('ordenProduccion')?.toString();

    this._reprocesoService.countReprocesoExtrusion( this.valor.toString() ).subscribe(data => {


      // That allows to know if there is a consecutive
      if (data[0][0] == null) {
        
        var consecutivo = 1;
  
        this.NoLote = this.valor.toString().replace(/[a-zA-Z ]/g, "") +"-"+ consecutivo.toString()+"R";


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
  
        this.InsertarReproceso(entrada)
      }else{
        var consecutivo = parseInt(data[0][0].noLote.substr(data[0][0].noLote.indexOf('-') + 1, ).replace(/[a-zA-Z ]/g, "")) + 1;
  
        this.NoLote = this.valor.toString().replace(/[a-zA-Z ]/g, "") +"-"+ consecutivo.toString()+"R";
  
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
  
        this.InsertarReproceso(entrada)
      }

     
      
      this.form.reset();
    }, error => {
      console.log(error);
    })

  }

  // This function insert the data of Reproceso component
  InsertarReproceso(entrada: any){
    this._reprocesoService.saveReprocesoExtrusion(entrada).subscribe(data => {

      this.toastr.success('El reproceso fue insertado con exito', 'Reproceso insertado');
      this._reprocesoService.totalKgReproceso =  this._reprocesoService.totalKgReproceso + parseInt(entrada.pesoNetoRollo);
      
      if (this._reprocesoService.ReprocesoActualizar) {
        this._reprocesoService.ReprocesoActualizar = false  
      }else{
        this._reprocesoService.ReprocesoActualizar = true  
      }
      
      this.form.reset();
    }, error => {
      console.log(error);
    })
  }

  // This function disable the component of reproceso ingresar
  cancelarReprocesoIngresar(){
    this.cambio.emit(false);

    this.cortina[0].style.visibility = 'hidden';
  }

  range(start = 0, stop = 0, step = 0) {
    var a = [start], b = start;
    while (b < stop) {
        a.push(b += step || 1);
    }
    return a;
  }

  capturar(value: any) {
    // It Passes the value selected to the variable verSeleccion
    if (value == 'A') {
      this.ReprocesoUbicacionNumeroNumero = [];
      this.ReprocesoUbicacionNumeroNumero = this.range(1, 30, 1);
    }
    if (value == 'B') {
      this.ReprocesoUbicacionNumeroNumero = [];
      this.ReprocesoUbicacionNumeroNumero = this.range(1, 30, 1);
    }
    if (value == 'C') {
      this.ReprocesoUbicacionNumeroNumero = [];
      this.ReprocesoUbicacionNumeroNumero = this.range(1, 30, 1);
    }
  }

}
