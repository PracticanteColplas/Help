import { Component, OnChanges, Input, Output, EventEmitter} from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { TiempoParoService } from 'src/app/services/tiempo-paro.service';

@Component({
  selector: 'app-tiempo-paro-eliminar',
  templateUrl: './tiempo-paro-eliminar.component.html',
  styleUrls: ['./tiempo-paro-eliminar.component.css']
})
export class TiempoParoEliminarComponent implements OnChanges {

  constructor(
    private toastr: ToastrService,
    private _tiempoParoService: TiempoParoService,
  ) { 
  }

  @Output() cambio = new EventEmitter();
  @Input() tiempoParoEliminar: any;

  ngOnChanges(): void {
    if (this.tiempoParoEliminar != 0) {
      this.eliminarTiempoParo();    
    }
  }

  // This function allows you delete the element in Tiempo paro
  eliminarTiempoParo(){
    this._tiempoParoService.deleteTiempoParoExtrusion(this._tiempoParoService.TiempoParoEliminar).subscribe(data => {
    
      this.toastr.error('El tiempo de paro fue eliminado con exito', 'Tiempo de paro eliminado');
      this.transformarTiempo(this._tiempoParoService.TiempoParoEliminarElemento)

      if (this._tiempoParoService.TiempoParoActualizar) {
        this._tiempoParoService.TiempoParoActualizar = false  
      }else{
        this._tiempoParoService.TiempoParoActualizar = true  
      }
    }, error => {
      console.log(error);
    })
  }

  // This is the function that make the subtraction of the time in TiempoParo
  transformarTiempo(tiempoParoEliminarElemento: any){ 
    var fechaInicio = new Date(tiempoParoEliminarElemento.fechaInicio).getTime();
    var fechaFin = new Date(tiempoParoEliminarElemento.fechaFinal).getTime();

    var resta = fechaFin - fechaInicio;
    var horas = resta/(1000*60*60);

    this._tiempoParoService.TiempoParoTotal = this._tiempoParoService.TiempoParoTotal - horas;

  }

}