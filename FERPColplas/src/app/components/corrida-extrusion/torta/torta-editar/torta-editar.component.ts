import { Component, Input, OnChanges, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TortaService } from 'src/app/services/torta.service';

@Component({
  selector: 'app-torta-editar',
  templateUrl: './torta-editar.component.html',
  styleUrls: ['./torta-editar.component.css']
})
export class TortaEditarComponent implements OnChanges {

  form: FormGroup;

  @Output() cambio = new EventEmitter();
  @Input() tortaExtrusionActualizar: any;
  @Input() TortaExtrusionPermiso: any;
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
    private _tortaService: TortaService, 
    private eRef: ElementRef,
  ) 
  {
    this.form = this.fb.group({
      cantidad: ['', [Validators.required]], 
    }) 
  }


  ngOnChanges(): void {

    this.cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>
    // Thas's for enable the buttom for send the data
    if (this.tortaExtrusionActualizar.pk_TortaExtrusion) {
      this.ActivarBoton = true
    }else{
      this.ActivarBoton = false
    }
  }


  // This function edit the TortaExtrusionCantidad
  editarTortaExtrusion(){
    const entrada: any = {
      cantidad: this.form.get('cantidad')?.value,
    }

    this.tortaExtrusionActualizar.cantidad = entrada.cantidad

    this._tortaService.updateTortaExtrusionCantidad(this.tortaExtrusionActualizar.pk_TortaExtrusion, this.tortaExtrusionActualizar).subscribe(data => {
      this.form.reset();
    }, error => {
      console.log(error);
    })
    
  }

  // This function disable this component
  cancelarTortaExtrusionEditar(){
    this.cambio.emit(false);
    this.cortina[0].style.visibility = 'hidden';
  }

}