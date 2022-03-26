import { Component, OnInit, OnChanges, SimpleChanges, Input, EventEmitter, Output} from '@angular/core';

import { CorridaService } from 'src/app/services/corrida.service';
import { TortaService } from 'src/app/services/torta.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-torta-mostrar',
  templateUrl: './torta-mostrar.component.html',
  styleUrls: ['./torta-mostrar.component.css']
})
export class TortaMostrarComponent implements OnChanges {


  @Input() tortaExtrusionActualizar: any;
  @Output() cambioEditarTortaCorridaExtrusion = new EventEmitter();
  @Output() cambioEliminarTortaExtrusion = new EventEmitter();

  CorridasExtrusion : any[] = [
  ];
  TortaCorridaExtrusion : any[] = [
  ];
  
  NoLote!: string | null;
  Actualizar!: boolean | null;


  constructor(
    public _corridaService: CorridaService,
    public _tortaService: TortaService,
    private toastr: ToastrService,
  ) 
  { 
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.CorridasExtrusion = [];
    try {

      this.CorridasExtrusion.push(this._corridaService.DatosCorridaNoFinalizada)  
      this.CorridasExtrusion.push(this._corridaService.CorridaExtrusion)  

    } catch (error) {
      
    }

    try {
      if (this.CorridasExtrusion) {
        this.obtenerTortaExtrusion(); 
      }  
    } catch (error) {
      
    }
    
  }

  // This function get the data in TortaExtrusion acording to the current corrida
  obtenerTortaExtrusion(){
    var pk: any;
    if (this.CorridasExtrusion[0].length > 0) {
      pk = this.CorridasExtrusion[0][2][0][0].pk_CorridaExtrusion;
    }
    if (this.CorridasExtrusion[1].pk_CorridaExtrusion != undefined) {
      pk = this.CorridasExtrusion[1].pk_CorridaExtrusion;
    }

    if (pk != undefined) {
      this._tortaService.getTortaExtrusionCantidad(pk).subscribe(data => {
        this.TortaCorridaExtrusion = data[0];

        var tortaCorrrida: any = [];
        tortaCorrrida.push(this.TortaCorridaExtrusion);

    
        if (this._corridaService.numeroCorridaPagination == 0) {
          this._corridaService.AlmacenarInformacionCorrida[1][4] = tortaCorrrida;    
        }else{
          this._corridaService.AlmacenarInformacionCorrida[this._corridaService.numeroCorridaPagination][4] = tortaCorrrida;  
        }
      
      }, error => {
        console.log(error);
      })
    }
    
  }

  // This function enable the component of torta editar
  editarTortaExtrusion(tortaCorridaExtrusion: any){

    if (this._corridaService.AceptarTorta) {
      this._tortaService.TortaCorridaExtrusion = tortaCorridaExtrusion;
      this.cambioEditarTortaCorridaExtrusion.emit(true);
      var cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>
      cortina[0].style.visibility = 'visible';  
    }

  }

  // This function enable the component of torta eliminar
  eliminarTortaExtrusion(tortaCorridaExtrusionId: number){
    
    if (this._corridaService.AceptarTorta) {
      this._tortaService.TortaExtrusionEliminar = tortaCorridaExtrusionId;
      this.cambioEliminarTortaExtrusion.emit(true)
    }

  }

}
