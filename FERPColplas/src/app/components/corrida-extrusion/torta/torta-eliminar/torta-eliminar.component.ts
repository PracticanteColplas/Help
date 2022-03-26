import { Component, OnChanges, Input, Output, EventEmitter, HostListener} from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { TortaService } from 'src/app/services/torta.service';

@Component({
  selector: 'app-torta-eliminar',
  templateUrl: './torta-eliminar.component.html',
  styleUrls: ['./torta-eliminar.component.css']
})
export class TortaEliminarComponent implements OnChanges {

  constructor(
    private toastr: ToastrService,
    private _tortaService: TortaService,
  ) { 
  }

  @Output() cambio = new EventEmitter();
  @Input() tortaExtrusionEliminar: any;

  ngOnChanges(): void {
    if (this.tortaExtrusionEliminar != 0) {
      this.eliminarTortaExtrusionCantidad();    
    }
  }

  // This function allows to delete the data in Torta component
  eliminarTortaExtrusionCantidad(){
    this._tortaService.deleteTortaExtrusionCantidad(this._tortaService.TortaExtrusionEliminar).subscribe(data => {
      this.toastr.error('La torta fue eliminada con exito', 'Torta eliminada');
      if (this._tortaService.TortaExtrusionActualizar) {
        this._tortaService.TortaExtrusionActualizar = false  
      }else{
        this._tortaService.TortaExtrusionActualizar = true  
      }
    }, error => {
      console.log(error);
    })
  }
}