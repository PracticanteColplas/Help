import { Component, OnInit, OnChanges, SimpleChanges, Input, EventEmitter, Output} from '@angular/core';

import { CorridaService } from 'src/app/services/corrida.service';
import { TiempoParoService } from 'src/app/services/tiempo-paro.service';

@Component({
  selector: 'app-tiempo-paro-mostrar',
  templateUrl: './tiempo-paro-mostrar.component.html',
  styleUrls: ['./tiempo-paro-mostrar.component.css']
})
export class TiempoParoMostrarComponent implements OnChanges {

  @Input() TiempoParoActualizar: any;
  
  @Output() cambioEditarTiempoParo = new EventEmitter();


  @Output() cambioVerTiempoParo = new EventEmitter();

  CorridasExtrusion : any[] = [
  ];
  TiempoParo : any[] = [
  ];
  TotalHoras : any;

  constructor(
    public _corridaService: CorridaService,
    public _tiempoParoService: TiempoParoService,
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



    this.TotalHoras = this._tiempoParoService.TiempoParoTotal;
    try {
      if (this.CorridasExtrusion) {
        this.obterTiempoParo(); 
        
      }  
    } catch (error) {
      
    }
  
  }

  // This function gets all the elements in tiempo paro in the current corrida
  obterTiempoParo(){

    var pk: any;
    if (this.CorridasExtrusion[0].length > 0) {

      pk = this.CorridasExtrusion[0][2][0][0].pk_CorridaExtrusion;


    }
    if (this.CorridasExtrusion[1].pk_CorridaExtrusion != undefined) {
      pk = this.CorridasExtrusion[1].pk_CorridaExtrusion;
    }

    if (pk != undefined) {
      this._tiempoParoService.countTiempoParoExtrusion(pk).subscribe(data => {
        this.TiempoParo = data[0];
        this._tiempoParoService.TiempoParoPermisoEditar = true;
  
  
        var tiempoParoCorrrida: any = [];
        tiempoParoCorrrida.push(this.TiempoParo);
  
    
        if (this._corridaService.numeroCorridaPagination == 0) {
          this._corridaService.AlmacenarInformacionCorrida[1][6] = tiempoParoCorrrida;    
        }else{
          this._corridaService.AlmacenarInformacionCorrida[this._corridaService.numeroCorridaPagination][6] = tiempoParoCorrrida;  
        }
        this._tiempoParoService.TiempoParoTotal = 0;
        var arrayHorariosTiempoParo: any = [];
        var horasRestar: any = 0;
  
        for (let index = 0; index < this.TiempoParo.length; index++) {
          var fechaInicio = new Date(this.TiempoParo[index].fechaInicio).getTime();
          var fechaFin = new Date(this.TiempoParo[index].fechaFinal).getTime();
  
          var resta = fechaFin - fechaInicio;
          var horas = resta/(1000*60*60);
  
          
          this._tiempoParoService.TiempoParoTotal = this._tiempoParoService.TiempoParoTotal + horas
          this.TotalHoras = this._tiempoParoService.TiempoParoTotal;

          if ( arrayHorariosTiempoParo.find(x => x == this.TiempoParo[index].fechaInicio + this.TiempoParo[index].fechaFinal) != undefined ) {
            horasRestar = horasRestar + horas;
            
          }else{
            arrayHorariosTiempoParo.push(this.TiempoParo[index].fechaInicio + this.TiempoParo[index].fechaFinal)
          }
          
        }

        this.TotalHoras = this._tiempoParoService.TiempoParoTotal - horasRestar;

      }, error => {
        console.log(error);
      })
    }
    

   
  }

  // This function allows you edit the elements in the tiempo paro
  editarTiempoParo(TiempoParo: any){
    if (this._corridaService.AceptarTiempoParo == true) {
      this._tiempoParoService.TiempoParo = TiempoParo;
      this.cambioEditarTiempoParo.emit(true);
      var cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>
      cortina[0].style.visibility = 'visible';
    }
  }

  // It's the function that allows you to delete elements in tiempo paro
  eliminarTiempoParo(tiempoParoId: number, tiempoParo: any){
    if (this._corridaService.AceptarTiempoParo == true) {
      this._tiempoParoService.TiempoParoEliminar = tiempoParoId;
      this._tiempoParoService.TiempoParoEliminarElemento = tiempoParo;
      this.cambioVerTiempoParo.emit(true)
    }
  }
}
