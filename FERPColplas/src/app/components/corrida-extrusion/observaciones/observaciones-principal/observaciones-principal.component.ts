import { Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';

import { CorridaService } from 'src/app/services/corrida.service';
import { NotaService } from 'src/app/services/nota.service';

@Component({
  selector: 'app-observaciones-principal',
  templateUrl: './observaciones-principal.component.html',
  styleUrls: ['./observaciones-principal.component.css']
})
export class ObservacionesPrincipalComponent implements OnChanges {

  constructor(
    public _corridaService: CorridaService,
    public _notaService: NotaService,
  ) { }

  iniciarNuevoObservacion!: boolean | false;
  iniciarEditarObservaciones!: boolean | false;

  iniciarEliminarNota!: boolean | false;

  ngOnChanges(changes: SimpleChanges): void {
  }

  // All this functions allow to enable and disable the components of observaciones
  IniciarNuevoObservacion(){
    this.iniciarNuevoObservacion = true;
    var cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>
    cortina[0].style.visibility = 'visible';
  }

  cerrarObservacioningresar(entrada: any){
    this.iniciarNuevoObservacion = entrada
  }

  notaEditarMostrar(entrada: any){
    if (entrada == true) {
      this.iniciarEditarObservaciones = entrada  
    }
  }

  notaEditarMostrar_(entrada: any){
    if (entrada == false) {
      this.iniciarEditarObservaciones = entrada  
    }
  }
  
  notaEliminarMostrar(entrada: any){
    if (entrada == true) {
      this.iniciarEliminarNota = entrada  
    }
  }

  NotaEliminarMostrar_(entrada: any){
    if (entrada == false) {
      this.iniciarEliminarNota = entrada  
    }
  }

}
