import { Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';

import { CorridaService } from 'src/app/services/corrida.service';
import { TortaService } from 'src/app/services/torta.service';
import { ConsumoMPriExtrusionService } from 'src/app/services/consumo-mpri-extrusion.service';

@Component({
  selector: 'app-materia-prima-principal',
  templateUrl: './materia-prima-principal.component.html',
  styleUrls: ['./materia-prima-principal.component.css']
})
export class MateriaPrimaPrincipalComponent  {

  constructor(
    public _corridaService: CorridaService,
    public _tortaService: TortaService,
    public _consumoMPriExtrusionService: ConsumoMPriExtrusionService,
  ) { }

  iniciarNuevoConsumoMPriExtrusion!: boolean | false;
  iniciarEditarMPriExtrusion!: boolean | false;
  iniciarVerMPriExtrusion!: boolean | false;
  mostrarConsumoMPriExtrusion!: boolean | false;

  
  ngOnChanges(changes: SimpleChanges): void {
  }

  // This functions allow to enable and disable the components of ConsumoMPriExtrusion Iniciar and ConsumoMPriExtrusion Mostrar
  IniciarNuevoConsumoMPriExtrusion(){
    this.iniciarNuevoConsumoMPriExtrusion = true
  }

  cerrarExtrusionConsumoMPriIngresar(entrada: any){
    this.iniciarNuevoConsumoMPriExtrusion = entrada
  }

  MostrarConsumoMPriExtrusion(){
    this.mostrarConsumoMPriExtrusion = true
    
  }

  cerrarExtrusionMostrarConsumoMPriIngresar(entrada: any){
    this.mostrarConsumoMPriExtrusion = entrada
  }


  // This functions allow to enable and disable the components of MPriExtrusion Ver and MPriExtrusion Editar
  MPriExtrusionVer(entrada: any){
    if (entrada == true) {
      this.iniciarVerMPriExtrusion = entrada  
    }
  }

  MPriSalidaVer_(entrada: any){
    if (entrada == false) {
      this.iniciarVerMPriExtrusion = entrada  
    }
  }

  MPriCorridaExtrusionEditar(entrada: any){
    if (entrada == true) {
      this.iniciarEditarMPriExtrusion = entrada  
    }
  }

  MPriSalidaEditar_(entrada: any){
    if (entrada == false) {
      this.iniciarEditarMPriExtrusion = entrada  
    }
  }

}
