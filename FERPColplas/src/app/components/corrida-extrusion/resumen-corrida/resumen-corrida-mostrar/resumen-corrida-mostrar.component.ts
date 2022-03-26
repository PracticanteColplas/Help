import { Component, OnInit, OnChanges, SimpleChanges, Input, EventEmitter, Output} from '@angular/core';

import { CorridaService } from 'src/app/services/corrida.service';
import { MaterialService } from 'src/app/services/material.service';
import { ReprocesoService } from 'src/app/services/reproceso.service';
import { TiempoParoService } from 'src/app/services/tiempo-paro.service';
import { RetalService } from 'src/app/services/retal.service';
import { ResumenCorridaLiquidacionMaterialesService } from 'src/app/services/resumen-corrida-liquidacion-materiales.service';
import { ConsumoMPriExtrusionService } from 'src/app/services/consumo-mpri-extrusion.service';
import { DevolucionService } from 'src/app/services/devolucion.service';

@Component({
  selector: 'app-resumen-corrida-mostrar',
  templateUrl: './resumen-corrida-mostrar.component.html',
  styleUrls: ['./resumen-corrida-mostrar.component.css']
})
export class ResumenCorridaMostrarComponent implements OnChanges {

  @Input() materialSalidaActualizar: any;
  @Input() reprocesoExtrusionActualizar: any;
  @Input() tiempoEjecucionActualizar: any;
  

  @Output() cambioEditarMaterialSalida = new EventEmitter();
  @Output() cambioVerMaterialSalida = new EventEmitter();

  CorridasExtrusion : any[] = [
  ];
  MaterialSalida : any[] = [
  ];
  
  NoLote!: string | null;
  Actualizar!: boolean | null; 
  totalProducido: any; 
  totalKgReproceso: any; 
  tiempoEjecucion: any; 
  velocidad: any; 


  constructor(
    public _corridaService: CorridaService,
    public _materialService: MaterialService,
    public _reprocesoService: ReprocesoService,
    public _tiempoParoService: TiempoParoService,
    public _retalService: RetalService,
    public _resumenCorridaLiquidacionMaterialesService: ResumenCorridaLiquidacionMaterialesService,
    public _consumoMPriExtrusionService: ConsumoMPriExtrusionService,
    public _devolucionService: DevolucionService,
  ) 
  { 
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.totalProducido = this._materialService.MaterialSalidaTotal;
    this.totalKgReproceso = this._reprocesoService.totalKgReproceso;

    // The line of code 52 to 55 get the time of execution and the speed
    if (this._corridaService.DuracionCorrida != 0) {
      this.tiempoEjecucion = (this._corridaService.DuracionCorrida - this._tiempoParoService.TiempoParoTotal).toFixed(2);  
      // this.velocidad = ((this.totalProducido + this._retalService.RetalExtrusionTotal + this.totalKgReproceso) / this.tiempoEjecucion).toFixed(2); 
      this.velocidad = ((this.totalProducido + this.totalKgReproceso) / this.tiempoEjecucion).toFixed(2); 

    }


    this.ObtenerDatosResumenCorrida();
  }

  id: any = 0;
  ObtenerDatosResumenCorrida(){
    this._corridaService.DatosCorridaNoFinalizada;

    var corridaNueva: any = [];
    corridaNueva.push(this._corridaService.CorridaExtrusion);

    try {
      this.id = corridaNueva[0].pk_CorridaExtrusion;  
      if (this.id != undefined) {
        this._resumenCorridaLiquidacionMaterialesService.getResumenCorrida(this.id).subscribe(data => {
  
          this.ordenarDatos(data)
        }, error => {
          console.log(error);
        })
      }
      
      
    } catch (error) {
      
    }
    
    try {

      this.id = this._corridaService.DatosCorridaNoFinalizada[2][0][0].pk_CorridaExtrusion;  

      this._resumenCorridaLiquidacionMaterialesService.getResumenCorrida(this.id).subscribe(data => {

        this.ordenarDatos(data)
      }, error => {
        console.log(error);
      })
  
    } catch (error) {
      
    }

  }

  ordenarDatos(data: any){
    var totalProducido: any = 0;
    var totalReproceso: any = 0;
    var totalRetal: any = 0;

    try {
      for (let index = 0; index < data[0][0].length; index++) {
        totalReproceso += data[0][0][index].pesoNetoRollo;
      }
    } catch (error) {
      
    }
    try {
      for (let index = 0; index < data[1][0].length; index++) {
        totalProducido += data[1][0][index].pesoNetoRollo;
      }
    } catch (error) {
      
    }

    try {
      for (let index = 0; index < data[2][0].length; index++) {
        totalRetal += data[2][0][index].cantidad;
      }
    } catch (error) {
      
    }

    this.totalKgReproceso = totalReproceso.toFixed(2);
    this.totalProducido = totalProducido.toFixed(2);

    this._resumenCorridaLiquidacionMaterialesService.RetalExtrusionTotal = totalRetal;
    this._resumenCorridaLiquidacionMaterialesService.ResumenTotalProducido = totalProducido;


    if (this._consumoMPriExtrusionService.ConsumoMPriActualizar == true) {
      this._consumoMPriExtrusionService.ConsumoMPriActualizar = false;
    } else {
      this._consumoMPriExtrusionService.ConsumoMPriActualizar = true;
    }
    

  }

}
