import { Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';

import { CorridaService } from 'src/app/services/corrida.service';
import { TortaService } from 'src/app/services/torta.service';
import { DevolucionService } from 'src/app/services/devolucion.service';

@Component({
  selector: 'app-devolucion-principal',
  templateUrl: './devolucion-principal.component.html',
  styleUrls: ['./devolucion-principal.component.css']
})
export class DevolucionPrincipalComponent implements OnChanges {

  constructor(
    public _corridaService: CorridaService,
    public _tortaService: TortaService,
    public _devolucionService: DevolucionService,
  ) { }
  
  iniciarNuevaDevolucionExtrusion!: boolean | false;
  iniciarMostrarDevolucionExtrusion!: boolean | false;
  iniciarEditarDevolucion!: boolean | false;
  iniciarVerMaterialSalida!: boolean | false;


  ngOnChanges(changes: SimpleChanges): void {
    this.iniciarMostrarDevolucionExtrusion = this._devolucionService.iniciarMostrarDevolucionExtrusion;
  }

  // This function enable the component of nueva devolucion extrusion
  IniciarNuevaDevolucionExtrusion(){
    this.iniciarNuevaDevolucionExtrusion = true;
    var cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>
    cortina[0].style.visibility = 'visible';
  }

  // This function disable the extrusion devolucion ingresar
  cerrarExtrusionDevolucionIngresar(entrada: any){
    this.iniciarNuevaDevolucionExtrusion = entrada
  }

  devolucionEditarMostrar(entrada: any){
    if (entrada == true) {
      this.iniciarEditarDevolucion = entrada  
    }
  }
}
