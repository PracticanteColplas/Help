import { Component, OnInit, OnChanges, SimpleChanges, Input, EventEmitter, Output} from '@angular/core';

import { CorridaService } from 'src/app/services/corrida.service';
import { RetalService } from 'src/app/services/retal.service';

@Component({
  selector: 'app-retal-mostrar',
  templateUrl: './retal-mostrar.component.html',
  styleUrls: ['./retal-mostrar.component.css']
})
export class RetalMostrarComponent {

  @Input() retalExtrusionActualizar: any;
  @Output() cambioEditarRetalCorridaExtrusion = new EventEmitter();
  @Output() cambioEliminarRetalExtrusion = new EventEmitter();

  CorridasExtrusion : any[] = [
  ];
  RetalCorridaExtrusion : any;

 
  constructor(
    public _corridaService: CorridaService,
    public _retalService: RetalService,
  ) 
  { 
  }

  ngOnInit(): void {
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

        this.obterRetal(); 
  
      }  
    } catch (error) {
      
    }

 
  }

  // This function get the retal acording to the current corrida
  obterRetal(){
    var pk: any;
    if (this.CorridasExtrusion[0].length > 0) {

      pk = this.CorridasExtrusion[0][2][0][0].pk_CorridaExtrusion;
     
    }
    if (this.CorridasExtrusion[1].pk_CorridaExtrusion != undefined) {
      pk = this.CorridasExtrusion[1].pk_CorridaExtrusion;
    }

    if (pk != undefined) {
      this._retalService.getRetalExtrusionCantidad(pk).subscribe(data => {
        
        this.RetalCorridaExtrusion = data[0];
  
        var retalCorrrida: any = [];
        retalCorrrida.push(this.RetalCorridaExtrusion);
  
    
        if (this._corridaService.numeroCorridaPagination == 0) {
          this._corridaService.AlmacenarInformacionCorrida[1][3] = retalCorrrida;    
        }else{
          this._corridaService.AlmacenarInformacionCorrida[this._corridaService.numeroCorridaPagination][3] = retalCorrrida;  
        }
      
      }, error => {
        console.log(error);
      })  
    }
    
  }

  // It's for enable the component of retal editar
  editarRetalExtrusion(retalCorridaExtrusion: any){
    if (this._corridaService.AceptarRetalExtrusion) {
      this._retalService.RetalCorridaExtrusion = retalCorridaExtrusion;
      this.cambioEditarRetalCorridaExtrusion.emit(true);
      var cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>
      cortina[0].style.visibility = 'visible';
    }
  }

  // It's for enable the component of retal eliminar
  eliminarRetalExtrusion(retalCorridaExtrusionId: number, retalCorridaExtrusionCantidad: number){
    if (this._corridaService.AceptarRetalExtrusion) {
      this._retalService.RetalExtrusionEliminar = retalCorridaExtrusionId;
      this._retalService.RetalExtrusionCantidadEliminar = retalCorridaExtrusionCantidad;
      this.cambioEliminarRetalExtrusion.emit(true);
    }
  }

}