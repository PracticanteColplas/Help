import { Component, OnInit, OnChanges, SimpleChanges, Input, EventEmitter, Output} from '@angular/core';

import { CorridaService } from 'src/app/services/corrida.service';
import { MaterialService } from 'src/app/services/material.service';
import { DevolucionService } from 'src/app/services/devolucion.service';

import { ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-devolucion-mostrar',
  templateUrl: './devolucion-mostrar.component.html',
  styleUrls: ['./devolucion-mostrar.component.css']
})
export class DevolucionMostrarComponent implements OnChanges {

  @Input() DevolucionTotal: any;
  @Output() cambioEditarDevolucion = new EventEmitter();
  @Output() cambioVerMaterialSalida = new EventEmitter();

  CorridasExtrusion : any[] = [
  ];
  DevolucionesOrden : any[] = [
  ];
  
  NoLote!: string | null;
  Actualizar!: boolean | null;

  public ordenProduccion: any;
  totalProducido: any; 


  constructor(
    public _corridaService: CorridaService,
    public _materialService: MaterialService,
    public _devolucionService: DevolucionService,
    private route : ActivatedRoute, 
  ) 
  { 
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.totalProducido = this._materialService.MaterialSalidaTotal;
    

    this.CorridasExtrusion.push(this._corridaService.CorridaExtrusion)
    if (this.CorridasExtrusion[0]) {
      this.obtenerDevolucion();  
    }
    
  }

  // It get all the data in Devolucion in a give orden de produccion
  obtenerDevolucion(){
    this.ordenProduccion = this.route.snapshot.paramMap.get('ordenProduccion')?.toString();
    this._devolucionService.countDevoluciones(this.ordenProduccion).subscribe(data => {      
      this.DevolucionesOrden = data;

      if (this._devolucionService.DevolucionTotal > 0) {
        this._devolucionService.DevolucionTotal = 0;
      }

      for (let index = 0; index < data.length; index++) {
        this._devolucionService.DevolucionTotal = this._devolucionService.DevolucionTotal + data[index].cantidadConsumida;
      }


      var devolucionCorrrida: any = [];
      devolucionCorrrida.push(this.DevolucionesOrden);
  
      if (this._corridaService.numeroCorridaPagination == 0) {
        this._corridaService.AlmacenarInformacionCorrida[1][5] = devolucionCorrrida;    
      }else{
        this._corridaService.AlmacenarInformacionCorrida[this._corridaService.numeroCorridaPagination][5] = devolucionCorrrida;  
      }
    
    }, error => {
      console.log(error);
    })
  }
}