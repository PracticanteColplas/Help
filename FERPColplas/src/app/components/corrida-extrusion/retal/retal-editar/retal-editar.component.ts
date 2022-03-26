import { Component, Input, OnChanges, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { RetalService } from 'src/app/services/retal.service';
import { MaterialService } from 'src/app/services/material.service';
import { DevolucionService } from 'src/app/services/devolucion.service';
import { ConsumoMPriExtrusionService } from 'src/app/services/consumo-mpri-extrusion.service';

@Component({
  selector: 'app-retal-editar',
  templateUrl: './retal-editar.component.html',
  styleUrls: ['./retal-editar.component.css']
})
export class RetalEditarComponent implements OnChanges {

  form: FormGroup;

  @Output() cambio = new EventEmitter();
  @Input() retalExtrusionActualizar: any;


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
      window.location.reload();  
    }
  }

  constructor(
    private fb: FormBuilder, 
    private _retalService: RetalService, 
    private _materialService: MaterialService, 
    private _devolucionService: DevolucionService, 
    private _consumoMPriExtrusionService: ConsumoMPriExtrusionService, 
    private eRef: ElementRef,
  ) 
  {
    this.form = this.fb.group({
      cantidad: ['', [Validators.required]], 
    }) 
  }


  ngOnChanges(): void {

    
    this.cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>
    // That's for enable de buttom of the component
    if (this.retalExtrusionActualizar.pk_RetalExtrusionCantidad) {
      // That changes the value for enable the buttom
      this.ActivarBoton = true
    }else{
      this.ActivarBoton = false
    }
  }

  // This function allows edit the retal's data
  editarRetalExtrusion(){
    const entrada: any = {
      cantidad: this.form.get('cantidad')?.value,
    }

    var retalAntes = this.retalExtrusionActualizar.cantidad;

    this.retalExtrusionActualizar.cantidad = entrada.cantidad

    this._retalService.updateRetalExtrusionCantidad(this.retalExtrusionActualizar.pk_RetalExtrusionCantidad, this.retalExtrusionActualizar).subscribe(data => {

      this._retalService.RetalExtrusionTotal = this._retalService.RetalExtrusionTotal - retalAntes + entrada.cantidad;

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

  // This function disable the component, this component
  cancelarRetalExtrusionEditar(){
    this.cambio.emit(false);
    this.cortina[0].style.visibility = 'hidden';
    window.location.reload();  
  }

}
