import { Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';

import { CorridaService } from 'src/app/services/corrida.service';
import { TiempoParoService } from 'src/app/services/tiempo-paro.service';

@Component({
  selector: 'app-tiempo-paro-principal',
  templateUrl: './tiempo-paro-principal.component.html',
  styleUrls: ['./tiempo-paro-principal.component.css']
})
export class TiempoParoPrincipalComponent implements OnChanges {

  constructor( 
    public _corridaService: CorridaService,
    public _tiempoParoService: TiempoParoService,
    ) 
  { 
  }
  
  
  iniciarNuevoTiempoParo!: boolean | false;
  iniciarEditarTiempoParo!: boolean | false;

  iniciarVerTiempoParo!: boolean | false;
  
  ngOnChanges(changes: SimpleChanges): void {
  }



  // This functions allow to enable and disable the components
  IniciarNuevoTiempoParo(){
    this.iniciarNuevoTiempoParo = true;
    var cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>
    cortina[0].style.visibility = 'visible';
  }

  cerrarExtrusionTiempoParoIngresar(entrada: any){
    this.iniciarNuevoTiempoParo = entrada
  }

  tiempoParoEditarMostrar(entrada: any){
    if (entrada == true) {
      this.iniciarEditarTiempoParo = entrada  
    }
  }

  tiempoParoEditarMostrar_(entrada: any){
    if (entrada == false) {
      this.iniciarEditarTiempoParo = entrada  
    }
  }

  tiempoParoEliminarMostrar(entrada: any){
    if (entrada == true) {
      this.iniciarVerTiempoParo = entrada  
    }
  }

  tiempoParoEliminarMostrar_(entrada: any){
    if (entrada == false) {
      this.iniciarVerTiempoParo = entrada  
    }
  }

}
