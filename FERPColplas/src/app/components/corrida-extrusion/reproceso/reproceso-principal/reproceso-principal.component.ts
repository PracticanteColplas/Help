import { Component, OnInit, OnChanges, SimpleChanges, Inject} from '@angular/core';

import { CorridaService } from 'src/app/services/corrida.service';
import { ReprocesoService } from 'src/app/services/reproceso.service';
import { ViewChild } from '@angular/core'
import { ReprocesoIngresarComponent } from 'src/app/components/corrida-extrusion/reproceso/reproceso-ingresar/reproceso-ingresar.component';

@Component({
  selector: 'app-reproceso-principal',
  templateUrl: './reproceso-principal.component.html',
  styleUrls: ['./reproceso-principal.component.css']
})
export class ReprocesoPrincipalComponent  {

  constructor( 
    public _corridaService: CorridaService,
    public  _reprocesoService: ReprocesoService,
    ) 
  { 
  }

  
  iniciarNuevoReproceso!: boolean | false;
  iniciarEditarReproceso!: boolean | false;
  iniciarVerReproceso!: boolean | false;
  
  ngOnChanges(changes: SimpleChanges): void {
  }


  // All this functions enable and disable the components of Reproceso
  IniciarNuevoReproceso(){
    this.iniciarNuevoReproceso = true;

    var cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>
    cortina[0].style.visibility = 'visible';
  }

  cerrarExtrusionReprocesoingresar(entrada: any){
    this.iniciarNuevoReproceso = entrada
  }

  reprocesoEditarMostrar(entrada: any){
    if (entrada == true) {
      this.iniciarEditarReproceso = entrada  
    }
  }

  reprocesoEditarMostrar_(entrada: any){
    if (entrada == false) {
      this.iniciarEditarReproceso = entrada  
    }
  }

  reprocesoVerMostrar(entrada: any){
    if (entrada == true) {
      this.iniciarVerReproceso = entrada  
    }
  }

  reprocesoVerMostrar_(entrada: any){
    if (entrada == false) {
      this.iniciarVerReproceso = entrada  
    }
  }

}