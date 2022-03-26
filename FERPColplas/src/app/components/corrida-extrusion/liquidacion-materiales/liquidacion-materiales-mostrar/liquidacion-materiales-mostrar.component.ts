import { Component, OnInit, OnChanges, SimpleChanges, Input, EventEmitter, Output} from '@angular/core';

import { CorridaService } from 'src/app/services/corrida.service';
import { MaterialService } from 'src/app/services/material.service';
import { ReprocesoService } from 'src/app/services/reproceso.service';
import { TiempoParoService } from 'src/app/services/tiempo-paro.service';
import { RetalService } from 'src/app/services/retal.service';
import { ConsumoMPriExtrusionService } from 'src/app/services/consumo-mpri-extrusion.service';
import { DevolucionService } from 'src/app/services/devolucion.service';
import { ResumenCorridaLiquidacionMaterialesService } from 'src/app/services/resumen-corrida-liquidacion-materiales.service';

import { ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-liquidacion-materiales-mostrar',
  templateUrl: './liquidacion-materiales-mostrar.component.html',
  styleUrls: ['./liquidacion-materiales-mostrar.component.css']
})
export class LiquidacionMaterialesMostrarComponent implements OnChanges {

  @Input() MPriActualizar: any;
  @Input() devolucionActualizar: any;
  @Input() DevolucionTotal: any;
  @Input() MaterialSalidaActualizar: any;
  @Input() RetalExtrusionActualizar: any;
  
  
  @Output() cambioEditarMaterialSalida = new EventEmitter();
  @Output() cambioVerMaterialSalida = new EventEmitter();

  CorridasExtrusion : any[] = [
  ];
  MaterialSalida : any[] = [
  ];
  
  totalProducido: any; 
  materiaConsumido: any; 
  materiaConsumidoTotal: any; 
  CantidadDevuelta: any; 
  CantidadDevueltaTotal: any; 
  Desviacion: any; 
  SobranteFaltante: any; 
  devolucionCantidadTotal: any; 
  devolucionCantidadTotalElementos: any = [];
  totalRetal: any; 
  ordenProduccion: any; 
  MPriCantidad: any = []; 
  DevolucionCantidad: any = []; 
  MPriCantidadDevilucion: any = []; 

  public keys: any[] = [
  ]; 


  constructor(
    public _corridaService: CorridaService,
    public _materialService: MaterialService,
    public _retalService: RetalService,
    public _consumoMPriExtrusionService: ConsumoMPriExtrusionService,
    public _devolucionService: DevolucionService,
    public _resumenCorridaLiquidacionMaterialesService: ResumenCorridaLiquidacionMaterialesService,
    private route : ActivatedRoute, 
  ) 
  { 
  }

  // The elements that will show in the view
  ngOnChanges(changes: SimpleChanges): void { 

    this.ObtenerDatosLiquidacionCorrida();

  }


  id: any = 0;
  ObtenerDatosLiquidacionCorrida(){

    
    try {

      if (this._corridaService.DatosCorridaNoFinalizada.length > 0) {
        this.CorridasExtrusion.push(this._corridaService.DatosCorridaNoFinalizada[2][0][0])  
      }else{
        this.CorridasExtrusion.push(this._corridaService.CorridaExtrusion)
      }
      
    } catch (error) {
      
    }


    

   
    var corridaNueva: any = [];
    

    try {
    
      this.id = this.CorridasExtrusion[1].pk_CorridaExtrusion;  
     
     
      if (this.id != undefined) {
        this._resumenCorridaLiquidacionMaterialesService.getLiquidacionMateriales(this.id).subscribe(data => {

          this.MPriCantidad = data;
     

          this.ordenarInformacionMPriDevolucion();
          this.ordenarDatos(data)
          
        }, error => {
          console.log(error);
        })  
      }
 
    } catch (error) {
      
    }
    
    try {

      this.id = this._corridaService.DatosCorridaNoFinalizada[2][0][0].pk_CorridaExtrusion;  

      this._resumenCorridaLiquidacionMaterialesService.getLiquidacionMateriales(this.id).subscribe(data => {

        this.MPriCantidad = data;

        this.ordenarInformacionMPriDevolucion();

        this.ordenarDatos(data);

      }, error => {
        console.log(error);
      })
  
    } catch (error) {
      
    }

    this.ObtenerDevolucion();
    
  }


  ObtenerDevolucion(){
    
    this.ordenProduccion = this.route.snapshot.paramMap.get('ordenProduccion')?.toString();
    this._devolucionService.countDevoluciones(this.ordenProduccion).subscribe(data => {      
      
      this._devolucionService.DevolucionOrdenProduccion = data;

      this.DevolucionCantidad = data;

      
    }, error => {
      console.log(error);
    })
  }


  ordenarInformacionMPriDevolucion(){

    
    var mpriCantidad = this.MPriCantidad;
    var nuevoArray: any = [];
    var nNuevoArray: any = [];

    try {
      for (let index = 0; index < this.DevolucionCantidad.length; index++) {
        var array: any = [];
        array.push(this.DevolucionCantidad[index].descripcion)
        array.push(this.DevolucionCantidad[index].cantidadConsumida)
        if (nuevoArray[this.DevolucionCantidad[index].fk_MPri] != undefined) {
          nuevoArray[this.DevolucionCantidad[index].fk_MPri][1] += this.DevolucionCantidad[index].cantidadConsumida;
        } else {
          nuevoArray[this.DevolucionCantidad[index].fk_MPri] = array;
        }
        
       
        
      }  

    } catch (error) {
      
    }

    try {
      this.materiaConsumidoTotal = 0
      
      for (let a = 0; a < mpriCantidad[0][0].length; a++) {

        var nArray: any = [];
        nArray.push(this.MPriCantidad[0][0][a].descripcion);
        nArray.push([]);
        nArray.push(this.MPriCantidad[0][0][a].cantidadConsumida);
        nArray.push(this.MPriCantidad[0][0][a].pk_ConsumoMPriExtrusion);

        
        if (nNuevoArray[this.MPriCantidad[0][0][a].fk_MPri] != undefined && nArray[3] <  this.MPriCantidad[0][0][a].pk_ConsumoMPriExtrusion) {


          if (nNuevoArray[this.MPriCantidad[0][0][a].fk_MPri][2] != undefined) {
            this.materiaConsumidoTotal -= nNuevoArray[this.MPriCantidad[0][0][a].fk_MPri][2];
            this.materiaConsumidoTotal += this.MPriCantidad[0][0][a].cantidadConsumida;
            if (this.materiaConsumidoTotal < 0) {
              this.materiaConsumidoTotal = this.materiaConsumidoTotal * -1;
            }
            nNuevoArray[this.MPriCantidad[0][0][a].fk_MPri][2] = this.MPriCantidad[0][0][a].cantidadConsumida;  
            
          } else {
            nNuevoArray[this.MPriCantidad[0][0][a].fk_MPri][2] = this.MPriCantidad[0][0][a].cantidadConsumida;  
            this.materiaConsumidoTotal += this.MPriCantidad[0][0][a].cantidadConsumida;
          }

        } else {
          nNuevoArray[this.MPriCantidad[0][0][a].fk_MPri] = nArray;
        }

      }  
    } catch (error) {
      
    }

    this.MPriCantidadDevilucion = [];
    
    var n: any = [];


    for (const key in nNuevoArray) {
      n[key] = [nNuevoArray[key][0], nNuevoArray[key][2]];
      n[key].push(0)
    }


    this.DevolucionTotal = 0;
    for (const key in nuevoArray) {
      
      this.DevolucionTotal += nuevoArray[key][1];
      if (n[key] != undefined) {
        n[key][2] = nuevoArray[key][1]
      } else {
        n[key] = [nuevoArray[key][0], 0, nuevoArray[key][1]];
      } 
      
    
    }

    var m: any = [];
    
    for (const key in n) {
      m.push(n[key])
    }
    this.MPriCantidadDevilucion = m;
  

    this.devolucionCantidadTotalElementos = nuevoArray;
  }

  ordenarDatos(data: any){

    
    var cantidadConsumida: any = 0;
    var sobranteFaltante: any = 0;

    var array: any = [];
    
    try {
      for (let index = 0; index < data[0][0].length; index++) {
        var array2: any = [];
        var array3: any = [];

        if (array.length == 0) {
          array3.push(data[0][0][index].pk_ConsumoMPriExtrusion)
          array3.push(data[0][0][index].cantidadConsumida)
          array2[data[0][0][index].descripcion] = array3;
          array.push(array2)
          array2 = [];
          array3 = [];
        }else{

          if (array[0][data[0][0][index].descripcion] != undefined) {
            
            if (array[0][data[0][0][index].descripcion][0] < data[0][0][index].pk_ConsumoMPriExtrusion) {
              array[0][data[0][0][index].descripcion][0] = data[0][0][index].pk_ConsumoMPriExtrusion;
              array[0][data[0][0][index].descripcion][1] = data[0][0][index].cantidadConsumida;
            }


          } else {
            array3.push(data[0][0][index].pk_ConsumoMPriExtrusion)
            array3.push(data[0][0][index].cantidadConsumida)

            array[0][data[0][0][index].descripcion] = array3

            array2 = [];
            array3 = [];
          }

        }

      }

      
      
    } catch (error) {
      
    }

    try {
      for (const key in array[0]) {
        cantidadConsumida += array[0][key][1];
      }

    } catch (error) {
      
    }
    
    
    try {
      var retalTotal = this._resumenCorridaLiquidacionMaterialesService.RetalExtrusionTotal;
      var totalProducido = this._resumenCorridaLiquidacionMaterialesService.ResumenTotalProducido;
      
      
      sobranteFaltante = cantidadConsumida - (retalTotal + totalProducido);
    } catch (error) {
      
    }
    

    this.materiaConsumidoTotal = (cantidadConsumida).toFixed(2);
    this.SobranteFaltante = sobranteFaltante.toFixed(2);
    var desviacion = (sobranteFaltante / cantidadConsumida) * 100;

    if (desviacion == NaN) {
      this.Desviacion = 0
    }

    if (desviacion == Infinity || desviacion == -Infinity) {
      this.Desviacion = 0
    }else{
      this.Desviacion = desviacion.toFixed(2);
    }
    
  }



  // Sorts the elements that will show in the view
  ordenarMateriaPrima(materiaConsumido, cantidadDevuelta){


   
    if (materiaConsumido == 0) {
      for (const key in cantidadDevuelta) {
        if (this.keys.find(element => element == key) == undefined) {
          this.keys.push(key);  
        }
      }  
    }else{
      for (const key in materiaConsumido) {
        if (this.keys.find(element => element == key) == undefined) {
          this.keys.push(key);  
        }
      }
    }
    
  }

  // Gets all data in materiales de salida
  obterMaterialSalida(){
    this._materialService.countMaterialSalidaExtrusion(this.CorridasExtrusion[1].pk_CorridaExtrusion).subscribe(data => {
      this.MaterialSalida = data[0];
      this._materialService.MaterialSalidaPermisoEditar = true;
    }, error => {
      console.log(error);
    })
  }

  // Enable the material salida editar component
  editarMaterialSalida(MaterialSalida: any){
    this._materialService.MaterialSalida = MaterialSalida;
    this.cambioEditarMaterialSalida.emit(true)
  }

  // Enable the material salida ver component
  verMaterialSalida(MaterialSalida: any){
    this._materialService.MaterialSalidaVer[2] = MaterialSalida;
    this._materialService.MaterialSalidaPermisoVer = true;
    this.cambioVerMaterialSalida.emit(true)
  }

}