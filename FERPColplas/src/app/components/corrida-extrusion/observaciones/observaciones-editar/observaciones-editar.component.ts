import { Component, Input, OnChanges, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NotaService } from 'src/app/services/nota.service';

@Component({
  selector: 'app-observaciones-editar',
  templateUrl: './observaciones-editar.component.html',
  styleUrls: ['./observaciones-editar.component.css']
})
export class ObservacionesEditarComponent implements OnChanges {

  form: FormGroup;

  @Output() cambio = new EventEmitter();
  @Input() NotaActualizar: any;
  ActivarBoton!: boolean | false ;


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
    public _notaService: NotaService,
    private eRef: ElementRef,
  ) 
  {
    this.form = this.fb.group({
      Descripcion: ['', [Validators.required]], 
    }) 
  }


  ngOnChanges(): void {
    this.cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>

    // That verify the data in NotaActualizar that have been update
    if (this.NotaActualizar.pk_NotaExtrusion) {
      // This is for enable the buttom 
      this.ActivarBoton = true
    }else{
      this.ActivarBoton = false
    }
  }

  // This function is for make posible the updating of the data in NotaExtrusion
  editarNotaExtrusion(){
    const entrada: any = {
      Descripcion: this.form.get('Descripcion')?.value,
    }

    this.NotaActualizar.descripcion = entrada.Descripcion

    this._notaService.updateNotaExtrusion(this.NotaActualizar.pk_NotaExtrusion, this.NotaActualizar).subscribe(data => {
      this.form.reset();
    }, error => {
      console.log(error);
    })
    
  }

  // This function disable the component of NotaEditar
  cancelarNotaEditar(){
    this.cambio.emit(false);
    this.cortina[0].style.visibility = 'hidden';
  }

}
