import { Component, OnChanges, Input, Output, EventEmitter, HostListener} from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { NotaService } from 'src/app/services/nota.service';

@Component({
  selector: 'app-observaciones-eliminar',
  templateUrl: './observaciones-eliminar.component.html',
  styleUrls: ['./observaciones-eliminar.component.css']
})
export class ObservacionesEliminarComponent implements OnChanges {

  constructor(
    private toastr: ToastrService,
    public _notaService: NotaService,
  ) { 
  }

  @Output() cambio = new EventEmitter();
  @Input() NotaEliminar: any;

  ngOnChanges(): void {
    if (this.NotaEliminar != 0) {
      this.eliminarNota();    
    }
  }

  // This function allow to delete the data of Observaciones component
  eliminarNota(){
    this._notaService.deleteNotaExtrusion(this._notaService.NotaEliminar).subscribe(data => {
      this.toastr.error('El observacion fue eliminada con exito', 'Observacion eliminada');
      if (this._notaService.NotaActualizar) {
        this._notaService.NotaActualizar = false  
      }else{
        this._notaService.NotaActualizar = true  
      }
    }, error => {
      console.log(error);
    })
  }
}
