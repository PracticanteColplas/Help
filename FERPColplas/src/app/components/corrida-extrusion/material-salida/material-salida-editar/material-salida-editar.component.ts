import { Component, Input, OnChanges, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MaterialService } from 'src/app/services/material.service';

import { ToastrService } from 'ngx-toastr';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

@Component({
  selector: 'app-material-salida-editar',
  templateUrl: './material-salida-editar.component.html',
  styleUrls: ['./material-salida-editar.component.css']
})
export class MaterialSalidaEditarComponent implements OnChanges {

  form: FormGroup;

  @Output() cambio = new EventEmitter();
  @Input() materialSalidaActualizar: any;
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
    public _materialService: MaterialService,
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

    // Verify that the element materialSalidaActualizar has been updated
    if (this.materialSalidaActualizar.pk_MaterialSalida) {

      // It changes the values to active the buttom
      this.ActivarBoton = true
    }else{
      this.ActivarBoton = false
    }
  }

  // This function edit allow edit the data of material salida
  editarMaterialSalida(){
    const entrada: any = {
      pesoNetoRollo: this.form.get('pesoNetoRollo')?.value,
    }

    var valor = this.materialSalidaActualizar.pesoNetoRollo;

    this.materialSalidaActualizar.pesoNetoRollo = entrada.pesoNetoRollo

    this._materialService.updateMaterialSalidaExtrusion(this.materialSalidaActualizar.pk_MaterialSalida, this.materialSalidaActualizar).subscribe(data => {
      this.toastr.success('El material de salida fue actualizado con exito', 'Material salida actualizado');

      if (this._materialService.MaterialSalidaActualizar) {
        this._materialService.MaterialSalidaActualizar = false;
      }else{
        this._materialService.MaterialSalidaActualizar = true;
      }

      this._materialService.MaterialSalidaTotal = this._materialService.MaterialSalidaTotal - valor + this.materialSalidaActualizar.pesoNetoRollo;

      this.form.reset();
    }, error => {
      console.log(error);
    })
    
  }

  // This function allow to disable de component Material Salida Editar
  cancelarMaterialSalidaEditar(){
    this.cambio.emit(false);
    this.cortina[0].style.visibility = 'hidden';
  }
}
