import { Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';

import { CorridaService } from 'src/app/services/corrida.service';
import { MaterialService } from 'src/app/services/material.service';
import { ReprocesoService } from 'src/app/services/reproceso.service';

@Component({
  selector: 'app-resumen-corrida-principal',
  templateUrl: './resumen-corrida-principal.component.html',
  styleUrls: ['./resumen-corrida-principal.component.css']
})
export class ResumenCorridaPrincipalComponent implements OnChanges {

  constructor( 
    public _corridaService: CorridaService,
    public _materialService: MaterialService,
    public _reprocesoService: ReprocesoService,
    ) 
  { 
  }
  
  
  iniciarNuevoMaterialSalida!: boolean | false;
  iniciarEditarMaterialSalida!: boolean | false;
  iniciarEditarMaterialSalida_!: boolean | false;
  iniciarVerMaterialSalida!: boolean | false;
  iniciarVerMaterialSalida_!: boolean | false;
  
  ngOnChanges(changes: SimpleChanges): void {
  }

  // This functions allow to enable and disable the components of 
  IniciarNuevoMaterialSalida(){
    this.iniciarNuevoMaterialSalida = true
  }

  cerrarExtrusionMaterialSalidaingresar(entrada: any){
    this.iniciarNuevoMaterialSalida = entrada
  }

  materialSalidaEditarMostrar(entrada: any){
    if (entrada == true) {
      this.iniciarEditarMaterialSalida = entrada  
    }
  }

  materialSalidaEditarMostrar_(entrada: any){
    if (entrada == false) {
      this.iniciarEditarMaterialSalida = entrada  
    }
  }

  materialSalidaVerMostrar(entrada: any){
    if (entrada == true) {
      this.iniciarVerMaterialSalida = entrada  
    }
  }

  materialSalidaVerMostrar_(entrada: any){
    if (entrada == false) {
      this.iniciarVerMaterialSalida = entrada  
    }
  }

}
