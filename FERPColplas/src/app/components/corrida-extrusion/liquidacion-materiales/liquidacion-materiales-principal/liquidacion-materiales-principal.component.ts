import { Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';

import { CorridaService } from 'src/app/services/corrida.service';
import { MaterialService } from 'src/app/services/material.service';
import { ReprocesoService } from 'src/app/services/reproceso.service';
import { ConsumoMPriExtrusionService } from 'src/app/services/consumo-mpri-extrusion.service';
import { DevolucionService } from 'src/app/services/devolucion.service';
import { RetalService } from 'src/app/services/retal.service';

@Component({
  selector: 'app-liquidacion-materiales-principal',
  templateUrl: './liquidacion-materiales-principal.component.html',
  styleUrls: ['./liquidacion-materiales-principal.component.css']
})
export class LiquidacionMaterialesPrincipalComponent implements OnChanges {

  constructor( 
    public _corridaService: CorridaService,
    public _materialService: MaterialService,
    public _reprocesoService: ReprocesoService,
    public _consumoMPriExtrusionService: ConsumoMPriExtrusionService,
    public _devolucionService: DevolucionService,
    public _retalService: RetalService,
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


  // This functions allows get the data and update the data in the component of liquidacion materiales  
  materialSalidaEditarMostrar(entrada: any){
    if (entrada == true) {
      this.iniciarEditarMaterialSalida = entrada  
    }
  }

  materialSalidaVerMostrar(entrada: any){
    if (entrada == true) {
      this.iniciarVerMaterialSalida = entrada  
    }
  }

 
}
