import { Component, OnChanges, Input, Output, EventEmitter, HostListener} from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { RetalService } from 'src/app/services/retal.service';
import { MaterialService } from 'src/app/services/material.service';
import { DevolucionService } from 'src/app/services/devolucion.service';
import { ConsumoMPriExtrusionService } from 'src/app/services/consumo-mpri-extrusion.service';

@Component({
  selector: 'app-retal-eliminar',
  templateUrl: './retal-eliminar.component.html',
  styleUrls: ['./retal-eliminar.component.css']
})
export class RetalEliminarComponent implements OnChanges {

  constructor(
    private toastr: ToastrService,
    private _retalService: RetalService,
    private _materialService: MaterialService, 
    private _devolucionService: DevolucionService, 
    private _consumoMPriExtrusionService: ConsumoMPriExtrusionService, 
  ) { 
  }

  @Output() cambio = new EventEmitter();
  @Input() retalExtrusionEliminar: any;

  ngOnChanges(): void {
    if (this.retalExtrusionEliminar != 0) {
      this.eliminarRetalExtrusionCantidad();    
    }
  }

  // This function allows delete the Retal
  eliminarRetalExtrusionCantidad(){
     
    var retalEliminar = this._retalService.RetalExtrusionCantidadEliminar;

    this._retalService.deleteRetalExtrusionCantidad(this._retalService.RetalExtrusionEliminar).subscribe(data => {
      this.toastr.error('El retal fue eliminado con exito', 'Retal eliminado');

      this._retalService.RetalExtrusionTotal = this._retalService.RetalExtrusionTotal - retalEliminar;


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
  
    }, error => {
      console.log(error);
    })  
    
  }

}
