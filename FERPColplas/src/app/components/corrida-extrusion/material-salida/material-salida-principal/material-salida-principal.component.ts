import { Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';

import { CorridaService } from 'src/app/services/corrida.service';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-material-salida-principal',
  templateUrl: './material-salida-principal.component.html',
  styleUrls: ['./material-salida-principal.component.css'],
})
export class MaterialSalidaPrincipalComponent implements OnChanges{

  constructor( 
    public _corridaService: CorridaService,
    public _materialService: MaterialService,
    ) 
  { 
  }
  
  
  iniciarNuevoMaterialSalida!: boolean | false;
  iniciarEditarMaterialSalida!: boolean | false;
  iniciarEditarMaterialSalida_!: boolean | false;
  iniciarVerMaterialSalida!: boolean | false;
  iniciarVerMaterialSalida_!: boolean | false;

  cortina: any;
  
  ngOnChanges(changes: SimpleChanges): void {
  }

  // This functions allow to enable and disable the components of Material Salida Nuevo, Material Salida Editar, Material Salida Ver.

  IniciarNuevoMaterialSalida(){
    this.iniciarNuevoMaterialSalida = true;
    this.cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>
    this.cortina[0].style.visibility = 'visible';
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
