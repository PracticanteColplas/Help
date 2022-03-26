import { Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';

import { CorridaService } from 'src/app/services/corrida.service';
import { RetalService } from 'src/app/services/retal.service';

@Component({
  selector: 'app-retal-principal',
  templateUrl: './retal-principal.component.html',
  styleUrls: ['./retal-principal.component.css']
})
export class RetalPrincipalComponent implements OnChanges {

  constructor(
    public _corridaService: CorridaService,
    public _retalService: RetalService,
  ) { }

  iniciarNuevoRetalExtrusion!: boolean | false;
  iniciarEditarRetalExtrusion!: boolean | false;
  iniciarVerRetalExtrusion!: boolean | false;

  ngOnChanges(changes: SimpleChanges): void {
  }

  // This functios allow enable and disable the components
  IniciarNuevoRetalExtrusion(){
    this.iniciarNuevoRetalExtrusion = true;
    var cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>
    cortina[0].style.visibility = 'visible';
  }

  cerrarExtrusionRetalingresar(entrada: any){
    this.iniciarNuevoRetalExtrusion = entrada
  }

  retalCorridaExtrusionMostrar(entrada: any){
    if (entrada == true) {
      this.iniciarEditarRetalExtrusion = entrada  
    }
  }

  materialSalidaEditarMostrar_(entrada: any){
    if (entrada == false) {
      this.iniciarEditarRetalExtrusion = entrada  
    }
  }

  retalExtrusionEliminarMostrar(entrada: any){
    if (entrada == true) {
      this.iniciarVerRetalExtrusion = entrada  
    }
  }

  materialSalidaEliminarMostrar_(entrada: any){
    if (entrada == false) {
      this.iniciarVerRetalExtrusion = entrada  
    }
  }

}
