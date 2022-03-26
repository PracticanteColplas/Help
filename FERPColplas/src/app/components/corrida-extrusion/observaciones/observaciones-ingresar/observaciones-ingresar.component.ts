import { Component, OnInit, ElementRef, Input, HostListener, EventEmitter, Output, OnChanges} from '@angular/core';

import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { CorridaService } from 'src/app/services/corrida.service';
import { NotaService } from 'src/app/services/nota.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-observaciones-ingresar',
  templateUrl: './observaciones-ingresar.component.html',
  styleUrls: ['./observaciones-ingresar.component.css']
})
export class ObservacionesIngresarComponent  {

  form: FormGroup;
  @Input() observacionPermiso: any;
  CorridasExtrusion : any[] = [
  ];

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
    private _notaService: NotaService,
    private eRef: ElementRef,
    private toastr: ToastrService,
    ) 
  { 
    this.form = this.fb.group({
      Descripcion: ['', [Validators.required]], 
    }) 
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void { 
    this.cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>
    try {
      this.CorridasExtrusion.push(this._corridaService.DatosCorridaNoFinalizada)  
      this.CorridasExtrusion.push(this._corridaService.CorridaExtrusion)  
      
    } catch (error) {
      
    }
  }

  // This function allows to get the data of the component view of Observacion
  guardarNota(){
    var pk: any;
    if (this._corridaService.CorridaNoFinalizadaActivar) {
      pk = this.CorridasExtrusion[0][2][0][0].pk_CorridaExtrusion
    }else{
      pk = this.CorridasExtrusion[1].pk_CorridaExtrusion
    }

    const entrada: any = {
      fk_CorridaExtrusion: pk,
      descripcion: this.form.get('Descripcion')?.value,
    }

    // Connect with the function that allows to insert the data that have been insert in the component html of Observacion
    this.InsertarNota(entrada)
    
  }

  // This function allows to insert the news Notas
  InsertarNota(entrada: any){
    this._notaService.saveNotaExtrusion(entrada).subscribe(data => {
      this.toastr.success('La nota fue insertada con exito', 'Nota insertada');
      if (this._notaService.NotaActualizar) {
        this._notaService.NotaActualizar = false  
      }else{
        this._notaService.NotaActualizar = true  
      }
      
      this.form.reset();
    }, error => {
      console.log(error);
    })
  }

  // It allows to disable the component of NotaIngresar
  cancelarNotaIngresar(){
    this.cambio.emit(false);
    this.cortina[0].style.visibility = 'hidden';
  }
}
