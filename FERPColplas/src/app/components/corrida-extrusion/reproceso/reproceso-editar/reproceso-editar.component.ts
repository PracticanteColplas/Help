import { Component, Input, OnChanges, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ReprocesoService } from 'src/app/services/reproceso.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reproceso-editar',
  templateUrl: './reproceso-editar.component.html',
  styleUrls: ['./reproceso-editar.component.css']
})
export class ReprocesoEditarComponent implements OnChanges {

  form: FormGroup;

  @Output() cambio = new EventEmitter();
  @Input() reprocesoActualizar: any;
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
    public _reprocesoService: ReprocesoService,
    private eRef: ElementRef,
    private toastr: ToastrService,
  ) 
  {
    this.form = this.fb.group({
      pesoNetoRollo: ['', [Validators.required]], 
    }) 
  }


  ngOnChanges(): void {
    this.cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>

    // That allows to anable or disable the buttom of the component reproceso-editar
    if (this.reprocesoActualizar.pk_Reproceso) {
      this.ActivarBoton = true
    }else{
      this.ActivarBoton = false
    }
  }

  // This function allows to edit data of Reproceso 
  editarReproceso(){
    const entrada: any = {
      pesoNetoRollo: this.form.get('pesoNetoRollo')?.value,
    }

    var valor = this.reprocesoActualizar.pesoNetoRollo;

    this.reprocesoActualizar.pesoNetoRollo = entrada.pesoNetoRollo;

    this._reprocesoService.updateReprocesoExtrusion(this.reprocesoActualizar.pk_Reproceso, this.reprocesoActualizar).subscribe(data => {
      this.toastr.success('El reproceso fue actualizado con exito', 'Reproceso actualizado');

      if (this._reprocesoService.ReprocesoActualizar) {
        this._reprocesoService.ReprocesoActualizar = false;
      }else{
        this._reprocesoService.ReprocesoActualizar = true;
      }

      this._reprocesoService.totalKgReproceso = this._reprocesoService.totalKgReproceso - valor + this.reprocesoActualizar.pesoNetoRollo;


      this.form.reset();
    }, error => {
      console.log(error);
    })
    
  }

  // This function disable this component
  cancelarReprocesoEditar(){
    this.cambio.emit(false);
    this.cortina[0].style.visibility = 'hidden';
  }

}
