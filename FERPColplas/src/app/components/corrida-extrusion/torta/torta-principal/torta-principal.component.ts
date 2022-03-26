import { Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';

import { CorridaService } from 'src/app/services/corrida.service';
import { TortaService } from 'src/app/services/torta.service';

@Component({
  selector: 'app-torta-principal',
  templateUrl: './torta-principal.component.html',
  styleUrls: ['./torta-principal.component.css']
})
export class TortaPrincipalComponent implements OnChanges {

  constructor(
    public _corridaService: CorridaService,
    public _tortaService: TortaService,
  ) { }

  iniciarNuevaTortaExtrusion!: boolean | false;
  iniciarEditarTortaExtrusion!: boolean | false;
  iniciarEliminarTortaExtrusion!: boolean | false;

  ngOnChanges(changes: SimpleChanges): void {
  }

  // This functions allow to enable the components of TortaExtrusion
  IniciarNuevaTortaExtrusion(){
    this.iniciarNuevaTortaExtrusion = true;
    var cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>
    cortina[0].style.visibility = 'visible';
  }

  cerrarExtrusionTortaingresar(entrada: any){
    this.iniciarNuevaTortaExtrusion = entrada
  }

  tortaCorridaExtrusionMostrar(entrada: any){
    if (entrada == true) {
      this.iniciarEditarTortaExtrusion = entrada  
    }
  }

  TortaExtrusionEditarMostrar_(entrada: any){
    if (entrada == false) {
      this.iniciarEditarTortaExtrusion = entrada  
    }
  }

  tortaExtrusionEliminarMostrar(entrada: any){
    if (entrada == true) {
      this.iniciarEliminarTortaExtrusion = entrada  
    }
  }

  TortaExtrusionEliminarMostrar_(entrada: any){
    if (entrada == false) {
      this.iniciarEliminarTortaExtrusion = entrada  
    }
  }

}
