import { Component, OnChanges, Input, Output, EventEmitter, HostListener} from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { RetalService } from 'src/app/services/retal.service';
import { ConsumoMPriExtrusionService } from 'src/app/services/consumo-mpri-extrusion.service';
import { DevolucionService } from 'src/app/services/devolucion.service';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-materia-prima-eliminar',
  templateUrl: './materia-prima-eliminar.component.html',
  styleUrls: ['./materia-prima-eliminar.component.css']
})
export class MateriaPrimaEliminarComponent implements OnChanges {
  constructor(
    private toastr: ToastrService,
    private _retalService: RetalService,
    private _devolucionService: DevolucionService,
    private _materialService: MaterialService,
    private _consumoMPriExtrusionService: ConsumoMPriExtrusionService,
  ) { 
  }

  @Output() cambio = new EventEmitter();
  @Input() MPriExtrusionEliminar: any;

  ngOnChanges(): void {

    if (this.MPriExtrusionEliminar.pk_ConsumoMPriExtrusion != 0 && this.MPriExtrusionEliminar.pk_ConsumoMPriExtrusion != undefined) {
      this.eliminarRetalExtrusionCantidad();    
    }
  }

  eliminarRetalExtrusionCantidad(){
    var valor = this.MPriExtrusionEliminar.cantidadConsumida;
    this._consumoMPriExtrusionService.deleteMPriExtrusionCantidad(this.MPriExtrusionEliminar.pk_ConsumoMPriExtrusion).subscribe(data => {


      // Update the data in view
      this._consumoMPriExtrusionService.MPriExtrusionCantidadTotal[this.MPriExtrusionEliminar.fk_MPri] = this._consumoMPriExtrusionService.MPriExtrusionCantidadTotal[this.MPriExtrusionEliminar.fk_MPri] - this.MPriExtrusionEliminar.cantidadConsumida;      

      this.toastr.error('La materia prima fue eliminada con exito', 'Materia prima eliminada');

      this._consumoMPriExtrusionService.MPriExtrusionTotalIngresada[this._consumoMPriExtrusionService.MPriExtrusionCambioB];
      if (this._consumoMPriExtrusionService.MPriExtrusionTotalIngresada[this._consumoMPriExtrusionService.MPriExtrusionCambioB].length == 0) {
        this._consumoMPriExtrusionService.MPriExtrusionTotalIngresada.splice(this._consumoMPriExtrusionService.MPriExtrusionCambioB, 1);
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
      


      this._consumoMPriExtrusionService.MPriExtrusionTotal = this._consumoMPriExtrusionService.MPriExtrusionTotal - valor;

    }, error => {
      console.log(error);
    })

    if (this._consumoMPriExtrusionService.ConsumoMPriActualizar) {
      this._consumoMPriExtrusionService.ConsumoMPriActualizar = false;
    }else{
      this._consumoMPriExtrusionService.ConsumoMPriActualizar = true;
    }
  }
}
