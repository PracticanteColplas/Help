import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { ToastrService } from 'ngx-toastr';

import { OrdenProduccionService } from 'src/app/services/orden-produccion.service';
import { MaterialService } from 'src/app/services/material.service';
import { ReprocesoService } from 'src/app/services/reproceso.service';
import { OperarioService } from 'src/app/services/operario.service';
import { CorridaService } from 'src/app/services/corrida.service';
import { RetalService } from 'src/app/services/retal.service';
import { ConsumoMPriExtrusionService } from 'src/app/services/consumo-mpri-extrusion.service';
import { DevolucionService } from 'src/app/services/devolucion.service';
import { TortaService } from 'src/app/services/torta.service';
import { TiempoParoService } from 'src/app/services/tiempo-paro.service';
import { NotaService } from 'src/app/services/nota.service';

@Component({
  selector: 'app-orden-produccion',
  templateUrl: './orden-produccion.component.html',
  styleUrls: ['./orden-produccion.component.css']
})
export class OrdenProduccionComponent {

  listOrdenProduccion : any = { };  
  maquina : any;
  corridas: any;
  corridaTipo: any;  
  corridaTipoEscrito: any;  
  nuevaMaquina: any; 
  
  corridaNoFinalizadaV : any[] = [
  ]; 



  constructor(
    public _ordenProduccionService: OrdenProduccionService, 
    private route : ActivatedRoute, 
    public _materialService: MaterialService,
    public _reprocesoService: ReprocesoService,
    public _operarioService: OperarioService,
    public _corridaService:CorridaService,
    public _retalService:RetalService,
    public _consumoMPriExtrusionService:ConsumoMPriExtrusionService,
    public _devolucionService:DevolucionService,
    public _tortaService:TortaService,
    public _tiempoParoService:TiempoParoService,
    public _notaService:NotaService,
    private toastr: ToastrService,
  ) 
  {
  }

  obtenerOrdenProduccion(ordenProduccion: string){
    
    // That get the data of the Orden de produccion
    this._ordenProduccionService.getOrdenProduccion(ordenProduccion).subscribe(data => {
      this.ordenarData(data)

      this._ordenProduccionService.DatosOrdenProduccion = data;
      for (const key in data[0][0][0]) {
        this.listOrdenProduccion[key] = data[0][0][0][key]
      }  
      this._materialService.MaterialSalidaVer.push(data);
      this._reprocesoService.ReprocesoVer.push(data);

    }, error => {
      console.log(error);
    })

  }

  ordenarData(data: any){
    // The bellow code allows to sort all data that the search have got
    var dataOrdenarInformacionGeneral = this.ordenarInformacionGeneral(data);
    var dataMaterialSalida = this.ordenarMaterialSalida(dataOrdenarInformacionGeneral);
    var dataReproceso = this.ordenarReproceso(dataMaterialSalida);
    var dataRetal = this.ordenarRetal(dataMaterialSalida);
    var dataTorta = this.ordenarTorta(dataRetal);
    var dataTiempoParo = this.ordenarTiempoParo(dataTorta);
    var dataObservaciones = this.ordenarObservaciones(dataTiempoParo);


    this._ordenProduccionService.CorridasOrdenProduccion = dataObservaciones;

  }

  ordenarInformacionGeneral(data: any){
    for (let a = 0; a < data[1][0].length; a++) {
      var array: any = [];
      for (let i = 0; i < data[2][0].length; i++) {
        try {
          if (data[1][0][a].pk_CorridaExtrusion == data[2][0][i].corridaExtrusion) {
            array.push(data[2][0][i]);
          }
        } catch (error) {
          
        }
        
      }
      data[1][0][a]['InformacionGeneral'] = array;
      
    }

    return data;
    
  }

  ordenarMaterialSalida(data: any){
    for (let a = 0; a < data[1][0].length; a++) {
      var array: any = [];
      for (let i = 0; i < data[3][0].length; i++) {
        try {
          if (data[1][0][a].pk_CorridaExtrusion == data[3][0][i].corridaExtrusion) {
            array.push(data[3][0][i]);
          }
        } catch (error) {
          
        }
        
      }
      data[1][0][a]['MaterialSalida'] = array;
      
    }

    return data;
  }

  ordenarReproceso(data: any){
    for (let a = 0; a < data[1][0].length; a++) {
      var array: any = [];
      for (let i = 0; i < data[4][0].length; i++) {
        try {
          if (data[1][0][a].pk_CorridaExtrusion == data[4][0][i].corridaExtrusion) {
            array.push(data[4][0][i]);
          }
        } catch (error) {
          
        }
        
      }
      data[1][0][a]['Reproceso'] = array;
      
    }

    return data;
  }



  ordenarRetal(data: any){
    for (let a = 0; a < data[1][0].length; a++) {
      var array: any = [];
      for (let i = 0; i < data[5][0].length; i++) {
        try {
          if (data[1][0][a].pk_CorridaExtrusion == data[5][0][i].corridaExtrusion) {
            array.push(data[5][0][i]);
          }
        } catch (error) {
          
        }
        
      }
      data[1][0][a]['Retal'] = array;
      
    }

    return data;
  }

  ordenarTorta(data: any){
    for (let a = 0; a < data[1][0].length; a++) {
      var array: any = [];
      for (let i = 0; i < data[6][0].length; i++) {
        try {
          if (data[1][0][a].pk_CorridaExtrusion == data[6][0][i].corridaExtrusion) {
            array.push(data[6][0][i]);
          }
        } catch (error) {
          
        }
        
      }
      data[1][0][a]['Torta'] = array;
      
    }

    return data;
  }

  ordenarTiempoParo(data: any){
    for (let a = 0; a < data[1][0].length; a++) {
      var array: any = [];
      for (let i = 0; i < data[8][0].length; i++) {
        try {
          if (data[1][0][a].pk_CorridaExtrusion == data[8][0][i].corridaExtrusion) {
            array.push(data[8][0][i]);
          }
        } catch (error) {
          
        }
        
      }
      data[1][0][a]['TiempoParo'] = array;
      
    }

    return data;
  }

  ordenarObservaciones(data: any){
    var nuevo_array: any = [];
    for (let a = 0; a < data[1][0].length; a++) {
      var array: any = [];
      for (let i = 0; i < data[9][0].length; i++) {
        try {
          if (data[1][0][a].pk_CorridaExtrusion == data[9][0][i].corridaExtrusion) {
            array.push(data[9][0][i]);
          }
        } catch (error) {
          
        }
        
      }
      data[1][0][a]['Observaciones'] = array;
      
    }
    nuevo_array.push(data[0][0]);
    nuevo_array.push(data[1][0]);
    nuevo_array.push(data[7][0]);

    return nuevo_array;
  }


  onChange(event: any){

    var valorOperarioInicio : any = null;
    var valorOperarioFinal : any = null;

    var operarioInicio : any;
    operarioInicio = this._operarioService.DatosOperarioCorridaInicio;
    var operarioFinal : any;
    operarioFinal = this._corridaService.OperarioCorridaExtrusionFinal;

    localStorage.setItem("opeInicio", JSON.stringify(operarioInicio));
    localStorage.setItem("opeFinal", JSON.stringify(operarioFinal));

    
    

    var valor;

    var nOperarioInicio = localStorage.getItem("opeInicio");
    var nOperarioFinal = localStorage.getItem("opeFinal");

    if (nOperarioInicio != null) {
      valorOperarioInicio =  JSON.parse(nOperarioInicio);
    }

    if (nOperarioFinal != null) {
      valorOperarioFinal =  JSON.parse(nOperarioFinal);
    }

    if (valorOperarioFinal.length == 0 && valorOperarioInicio.length == undefined) {

      localStorage.setItem("opeInicio", JSON.stringify([]));
      localStorage.setItem("opeFinal", JSON.stringify([]));
    }



    this._corridaService.numeroCorridaPagination = event;
    this._ordenProduccionService.paginaActual = event;

    if (this._materialService.MaterialSalidaActualizar == false ) {
      this._materialService.MaterialSalidaActualizar = true;
    }else{
      this._materialService.MaterialSalidaActualizar = false;
    }
  
    return event
    
  }

  ngOnInit(): void {   
    var op = this.route.snapshot.paramMap.get('ordenProduccion');

    // hat verify the existence of that OrdenProduccion
    try {
      if(op !== null){
        this._ordenProduccionService.getOrdenProduccion(op).subscribe(data => {
      
          if (data[0][0].length != 0) {
    
            this._operarioService.getOperarioCorridaExtrusionOrden(op).subscribe(data => {
              this._corridaService.DatosEntradaSalida = data
              var corridaSinFinalizar: any = this.corridaNoFinalizada(data);
    
              if (corridaSinFinalizar.length != 0) {
                this._ordenProduccionService.corridaSinFinalizarEx = true;
                this.toastr.success('la corrida iniciada '+ corridaSinFinalizar.fechaHora +' por el operario identificado '+ corridaSinFinalizar.fk_Operario +' aun no se ha finalizado, por favor terminela', 'Corrida No finalizada');
                this._operarioService.getOperarioCorridaExtrusionOrden(corridaSinFinalizar.pk_OperarioCorridaExtrusion).subscribe(data => {
                  this._corridaService.DatosCorridaNoFinalizada = data

                  this.maquina = this._corridaService.DatosCorridaNoFinalizada[1][0][0].maquina;

                  if (this._corridaService.InformacionActualizar) {
                    this._corridaService.InformacionActualizar = false;
                  } else {
                    this._corridaService.InformacionActualizar = true;
                  }
                  
                  if (this._reprocesoService.ReprocesoActualizar) {
                    this._reprocesoService.ReprocesoActualizar = false;
                  } else {
                    this._reprocesoService.ReprocesoActualizar = true;
                  }
                  
                  if (this._retalService.RetalExtrusionActualizar) {
                    this._retalService.RetalExtrusionActualizar = false;
                  } else {
                    this._retalService.RetalExtrusionActualizar = true;
                  }
                  
                  if (this._corridaService.CorridaNoFinalizadaActivar) {
                    
                    this._corridaService.CorridaNoFinalizadaActivar = false;
                  } else {
                    this._corridaService.CorridaNoFinalizadaActivar = true;
                  }

                  if (this._tortaService.TortaExtrusionActualizar) {
                    
                    this._tortaService.TortaExtrusionActualizar = false;
                  } else {
                    this._tortaService.TortaExtrusionActualizar = true;
                  }

                  if (this._tiempoParoService.TiempoParoActualizar) {
                    
                    this._tiempoParoService.TiempoParoActualizar = false;
                  } else {
                    this._tiempoParoService.TiempoParoActualizar = true;
                  }

                  if (this._notaService.NotaActualizar) {
                    
                    this._notaService.NotaActualizar = false;
                  } else {
                    this._notaService.NotaActualizar = true;
                  }
                  if (this._devolucionService.DevolucionActualizar) {
                    
                    this._devolucionService.DevolucionActualizar = false;
                  } else {
                    this._devolucionService.DevolucionActualizar = true;
                  }


                  this._corridaService.AceptarMaterialSalida = true;
                  this._corridaService.AceptarRetalExtrusion = true;
                  this._corridaService.AceptarTiempoParo = true;
                  this._corridaService.AceptarObservacion = true;

                  this._corridaService.AceptarTorta = true;
                  this._corridaService.AceptarDevolucion = true;
                  this._corridaService.AceptarRetal = true;
                  this._corridaService.AceptarMPri = true;


                  if (this._materialService.MaterialSalidaActualizar) {
                    this._materialService.MaterialSalidaActualizar = false  
                  }else{
                    this._materialService.MaterialSalidaActualizar = true  
                  }
                  
                }, error => {
                  console.log(error);
                })  
              }
              
              
              
            }, error => {
              console.log(error);
            })
  
    
          }else{
            this.toastr.error('lo sentimos la orden de produccion no se encontro', 'Orden de Produccion no encontrada!');
          }
          
        }, error => {
          console.log(error);
        })
      }
      
    } catch (error) {
      
    }
    

    this._ordenProduccionService.CorridasOrdenProduccion[1] = []


    if (this._ordenProduccionService.reiniciar) {
      this._ordenProduccionService.reiniciar = false;
      window.location.reload();  
    }

    
    var primerContador = 0;
    var segundoContador = 0;
    var tercerContador = 0;


    this.corridaTipo = this.route.snapshot.paramMap.get('proceso')?.toString();
    if (this.corridaTipo == 1) {
      this.corridaTipoEscrito = "Extrusion"
    }
    if (this.corridaTipo == 2) {
      this.corridaTipoEscrito = "Impresion"
    }
    if (this.corridaTipo == 3) {
      this.corridaTipoEscrito = "Refilado"
    }
    
    this.corridas = [1];


    var ordenProduccion = this.route.snapshot.paramMap.get('ordenProduccion');

    if (ordenProduccion == null) {
      ordenProduccion = '';
    }
    
    this.obtenerOrdenProduccion(ordenProduccion);  
    
  }

  corridaNoFinalizada(data: any){

    this.corridaNoFinalizadaV = [];

    for (let index = 0; index < data[0][0].length; index++) {
      var contador = 0;
      for (let q = 0; q < data[0][0].length; q++) {

        if (data[0][0][index].fk_CorridaExtrusion == data[0][0][q].fk_CorridaExtrusion) {
          contador = contador + 1; 
        }

        if (data[0][0].length - 1 == q && contador < 2) {
          this.corridaNoFinalizadaV = data[0][0][index];
          
        }
      }  
    }

    return this.corridaNoFinalizadaV;
  }

  // That's for establish the maquina
  establecerMaquina(entrada: any){
    this.maquina = entrada;
  }

}