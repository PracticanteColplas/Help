import { Component, OnInit, OnChanges, SimpleChanges, Input, EventEmitter, Output} from '@angular/core';

import { CorridaService } from 'src/app/services/corrida.service';
import { NotaService } from 'src/app/services/nota.service';

@Component({
  selector: 'app-observaciones-mostrar',
  templateUrl: './observaciones-mostrar.component.html',
  styleUrls: ['./observaciones-mostrar.component.css']
})
export class ObservacionesMostrarComponent implements OnChanges {

  @Input() NotaActualizar: any;
  
  @Output() cambioEditarNota = new EventEmitter();

  @Output() cambioVerNota = new EventEmitter();
  

  CorridasExtrusion : any[] = [
  ];
  Nota : any[] = [
  ];

  constructor(
    public _corridaService: CorridaService,
    public _notaService: NotaService,
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

    if (this.CorridasExtrusion[0]) {

      this.obterNota(); 
    }
    
  }

  // This function get all the data in Observacion that have the pk of CorridaExtrusion
  obterNota(){

    var pk: any;
    if (this.CorridasExtrusion[0].length > 0) {

      pk = this.CorridasExtrusion[0][2][0][0].pk_CorridaExtrusion;

    }
    if (this.CorridasExtrusion[1].pk_CorridaExtrusion != undefined) {
      pk = this.CorridasExtrusion[1].pk_CorridaExtrusion;
    }

    if (pk != undefined) {
      this._notaService.countNotaExtrusion(pk).subscribe(data => {
        this.Nota = data[0];
        this._notaService.NotaPermisoEditar = true;
  
        var notaCorrrida: any = [];
        notaCorrrida.push(this.Nota);
    
        if (this._corridaService.numeroCorridaPagination == 0) {
          this._corridaService.AlmacenarInformacionCorrida[1][6] = notaCorrrida;    
        }else{
          this._corridaService.AlmacenarInformacionCorrida[this._corridaService.numeroCorridaPagination][6] = notaCorrrida;  
        }
      
      }, error => {
        console.log(error);
      })
    }
    
  }

  // This function allows to enable the component of EditarNota that allows edit the data of the Observacion component
  editarNota(Nota: any){
    if (this._corridaService.AceptarObservacion) {
      this._notaService.Nota = Nota;
      this.cambioEditarNota.emit(true);
      var cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>
      cortina[0].style.visibility = 'visible';
    }
  }

  // This function allows to enable the component of eliminarNota that allows to delete the data of the Observacion component
  eliminarNota(NotaId: number){
    if (this._corridaService.AceptarObservacion) {
      this._notaService.NotaEliminar = NotaId;
      this.cambioVerNota.emit(true)
    }
  }

}
