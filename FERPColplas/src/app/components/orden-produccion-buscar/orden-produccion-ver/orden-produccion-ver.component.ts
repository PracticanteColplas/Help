import { Component, OnInit, OnChanges, SimpleChanges, Input, EventEmitter, Output, HostListener, ElementRef} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OperarioService } from 'src/app/services/operario.service';
import { MaterialService } from 'src/app/services/material.service';
import { ReprocesoService } from 'src/app/services/reproceso.service';
import { CorridaService } from 'src/app/services/corrida.service';
import { BuscarOrdenProduccionService } from 'src/app/services/buscar-orden-produccion.service';

import { ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import * as XLSX from 'xlsx';
import { ExcelService } from 'src/app/excel.service';

@Component({
  selector: 'app-orden-produccion-ver',
  templateUrl: './orden-produccion-ver.component.html',
  styleUrls: ['./orden-produccion-ver.component.css']
})
export class OrdenProduccionVerComponent implements OnInit {

  
  @Input() ordenProduccionBuscar: any;

  constructor(
    private _operarioService: OperarioService, 
    public _reprocesoService: ReprocesoService,
    public _materialService: MaterialService,
    public _corridaService: CorridaService,
    public _buscarOrdenProduccionService: BuscarOrdenProduccionService,
    private route : ActivatedRoute, 
    private eRef: ElementRef,
    private excelService: ExcelService
  ) 
  {

  }

  cortina: any;

  ngOnChanges(): void {
    this.buscarCorridasOrden();
  }
  ngOnInit(): void {
    this.buscarCorridasOrden();

    if (this._buscarOrdenProduccionService.DescargarOrdenProduccionData == false) {
      var ver = document.getElementsByClassName("relative") as HTMLCollectionOf<HTMLElement>
      ver[0].style.visibility = 'visible';

    }

    this.cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>
  }

  @Output() cambio = new EventEmitter();

  isFocusInsideComponent = false;
  isComponentClicked = false;
  contador: any = 0;


  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.contador == 0 || this.eRef.nativeElement.contains(event.target) ) {
      this.contador += 1;
      this.isComponentClicked = true;
      this.isFocusInsideComponent = true;
    } else {
      this.contador += 1;
      this.cambio.emit(false)
      this.isComponentClicked = false;
      this.isFocusInsideComponent = false;

      this.cortina[0].style.visibility = 'hidden';
    }
  }

  inicioCorrida: any[] = [
  ];
  finalCorrida: any[] = [
  ];
  OperarioCorridaExtrusion: any;
  InformacionActualizarInicioFinal: any;
  fechaInicio: any;
  fechaFin: any;
  DuracionCorrida: any;


  corridasOrdenProduccion: any[] = [
  ];
  corridasOrdenProduccionTotal: any[] = [
  ];
  ordenProduccion: any;
  consecutivoPeso: any;

  p: number = 1;
  a: number = 1;

  consumoMPriExtrusionSend:any = [];
  consumoMPriExtrusionSendTotal: any = 0;
  consumoMPriExtrusionSendDevolucion:any = [];
  
  consumoMPriExtrusionSendTotalDevolucion: any = 0;
  
  ordenProduccionCuadre: any = 0;
  ordenProduccionDesviacion: any = 0;

  transferido: any = [];
  totalTransferenciaValor: any = 0;
  TotalDevolucion: any = [0];
  TotalDevolucionClases: any = [];
  corridaExtrusionDesperdicio: any = [];


  buscarCorridasOrden(){
    // The bellow code gets all the data of Corridas Extrusion acording to the orden de produccion
    this._corridaService.getCorridaExtrusionPk(this.ordenProduccionBuscar).subscribe(data => {
      
      
      this.ordenarInformacion(data);


      this.ordenarMateriaPrimaExtrusion(data[5][0]);
      this.ordenarMateriaPrimaExtrusionDevolucion(data[6][0]);
      this.unirDevolucionMateriaPrimaExtrusion(this.consumoMPriExtrusionSend, this.consumoMPriExtrusionSendDevolucion);
      this.obtenereCuadre();
      this.obtenereDesviacion();
      this.buscarTransferencia();
      this.consecutivoPeso = data[2][0];  

      this.totalDevolucion();
    

      this.descargarExcelDatos();
    }, error => {
      console.log(error);
    }) 

    
  }

  NonChange(event: any){
    return event
    
  }

  // This function of here is a few long but allows me to sort the data
  ordenarInformacion(data: any){
    var primerElemento: any;
    var segundoElemento: any;

    var nuevoElemento: any = [];
    var horasInicioFinal: any = [];
    var operarioInicioFinal: any = [];

    var primerArray: any = []; 

    var materialSalida = this.ordenarMaterialSalida(data);
    var tiemposParo = this.ordenarTiemposParo(data);
    var retal = this.ordenarRetal(data);
    var observacion = this.ordenarObservacion(data);

    var totalTotalProducido = 0;
    var TotalProducido = 0;
    var totalTotalTiempoEjecucion = 0;
    var TotalTiempoEjecucion = 0;
    var totalTotalKilosHora = 0;
    var totalTotalDesperdicio = 0;
    var totalTotalDesperdicioRetal: any = [];
    var arrayPrueba: any = [];

    if (data[0][0].length != 0) {
      var contador = 0;
      for (let k = 0; k < data[0][0].length; k++) {

        if ( (k + 1) < data[0][0].length) {
          

          if (data[0][0][k].pk_CorridaExtrusion == data[0][0][k + 1].pk_CorridaExtrusion) {
            primerElemento = data[0][0][k];
            segundoElemento = data[0][0][k + 1];
            k += 1;

            if (
                primerElemento.tiempoAjuste == segundoElemento.tiempoAjuste && 
                primerElemento.pk_CorridaExtrusion == segundoElemento.pk_CorridaExtrusion && 
                ( primerElemento.fechaHora != segundoElemento.fechaHora || primerElemento.fechaHora == segundoElemento.fechaHora ) && 
                ( primerElemento.nombre != segundoElemento.nombre  || primerElemento.nombre == segundoElemento.nombre  )
              ) {

              
              nuevoElemento.push(primerElemento.tiempoAjuste);
              nuevoElemento.push(primerElemento.pk_CorridaExtrusion);

              operarioInicioFinal.push(primerElemento.nombre);
              operarioInicioFinal.push(segundoElemento.nombre);

              horasInicioFinal.push(primerElemento.fechaHora);
              horasInicioFinal.push(segundoElemento.fechaHora);

              nuevoElemento.push(horasInicioFinal);
              nuevoElemento.push(operarioInicioFinal);

              if (materialSalida[primerElemento.pk_CorridaExtrusion + " "] == undefined) {
                materialSalida[primerElemento.pk_CorridaExtrusion + " "] = [0,[0]]

                var valor = this.mayor - 1;
                for (let index = 0; index < valor; index++) {
                  materialSalida[primerElemento.pk_CorridaExtrusion + " "][1].push(' ');
                  
                }
              }
            

              totalTotalProducido += materialSalida[primerElemento.pk_CorridaExtrusion + " "][0];
              TotalProducido = materialSalida[primerElemento.pk_CorridaExtrusion + " "][0];



              nuevoElemento.push(materialSalida[primerElemento.pk_CorridaExtrusion + " "]);

              
              if (tiemposParo[primerElemento.pk_CorridaExtrusion + " "] == undefined) {
                tiemposParo[primerElemento.pk_CorridaExtrusion + " "] = [0, ['---','---', 0]]
              }
              nuevoElemento.push(tiemposParo[primerElemento.pk_CorridaExtrusion + " "]);

            

              if (retal[primerElemento.pk_CorridaExtrusion + " "] == undefined) {
                retal[primerElemento.pk_CorridaExtrusion + " "] = [0 , ['---',0]]

                var valor = this.mayorRetal - 1;
              }

              
              totalTotalDesperdicio += retal[primerElemento.pk_CorridaExtrusion + " "][0];
              totalTotalDesperdicioRetal[0] = totalTotalDesperdicio;

              // var retal
              nuevoElemento.push(retal[primerElemento.pk_CorridaExtrusion + " "]);


              

              // console.log(retal[primerElemento.pk_CorridaExtrusion + " "]);
              


              var fechaInicio = new Date(primerElemento.fechaHora).getTime();
              var fechaFin = new Date(segundoElemento.fechaHora).getTime();
        
              var resta = fechaFin - fechaInicio;
            
              var horas = resta/(1000*60*60);

              totalTotalTiempoEjecucion += parseFloat(horas.toFixed(3) );
              TotalTiempoEjecucion = parseFloat(horas.toFixed(3) );
              nuevoElemento.push(horas.toFixed(3));


              if (nuevoElemento[4][0] == 0) {
                var kilosHora = 0;  
                var TotalkilosHora = 0;
              }else{

                
                var kilosHora = TotalProducido / TotalTiempoEjecucion;  
                var TotalkilosHora = totalTotalProducido / totalTotalTiempoEjecucion;  

              }
             
              if (kilosHora != Infinity) {

                totalTotalKilosHora = parseFloat(TotalkilosHora.toFixed(3) );  
              }else{

              }

              nuevoElemento.push(kilosHora.toFixed(3));

              

              if (observacion[primerElemento.pk_CorridaExtrusion + " "] == undefined) {
                observacion[primerElemento.pk_CorridaExtrusion + " "] = [['---']]

                var valor = this.mayorObservacion - 1;
                for (let index = 0; index < valor; index++) {
                  observacion[primerElemento.pk_CorridaExtrusion + " "].push(' ');
                  
                }
              }
              nuevoElemento.push(observacion[primerElemento.pk_CorridaExtrusion + " "]);

              primerArray.push(nuevoElemento);

              nuevoElemento = [];
              horasInicioFinal = [];
              operarioInicioFinal = [];

            }


          }else{

            nuevoElemento.push(data[0][0][k].tiempoAjuste);
            nuevoElemento.push(data[0][0][k].pk_CorridaExtrusion);

            operarioInicioFinal.push(data[0][0][k].nombre);
            horasInicioFinal.push(data[0][0][k].fechaHora);

            nuevoElemento.push(horasInicioFinal);
            nuevoElemento.push(operarioInicioFinal);

            totalTotalProducido += materialSalida[primerElemento.pk_CorridaExtrusion + " "][0];
            TotalProducido = materialSalida[primerElemento.pk_CorridaExtrusion + " "][0];

            
            nuevoElemento.push(materialSalida[primerElemento.pk_CorridaExtrusion + " "]);
            nuevoElemento.push(tiemposParo[primerElemento.pk_CorridaExtrusion + " "]);



            totalTotalDesperdicio += retal[primerElemento.pk_CorridaExtrusion + " "][0];
            totalTotalDesperdicioRetal[0] = totalTotalDesperdicio;
            nuevoElemento.push(retal[primerElemento.pk_CorridaExtrusion + " "]);




            var horas = 0;

            totalTotalTiempoEjecucion += parseFloat(horas.toFixed(3) );
            TotalTiempoEjecucion = parseFloat(horas.toFixed(3) );
            nuevoElemento.push(horas);

            if (nuevoElemento[4][0] == 0) {
              var kilosHora = 0;  
              var TotalkilosHora = 0;
            }else{

              var kilosHora = TotalProducido / TotalTiempoEjecucion;  
              var TotalkilosHora = totalTotalProducido / totalTotalTiempoEjecucion;  


            }

            if (kilosHora != Infinity) {

              totalTotalKilosHora = parseFloat(TotalkilosHora.toFixed(3) );  
            }else{
                
            }
            nuevoElemento.push(kilosHora);

            if (observacion[primerElemento.pk_CorridaExtrusion + " "] == undefined) {
              observacion[primerElemento.pk_CorridaExtrusion + " "] = [['---']]
            }
            arrayPrueba.push(observacion[primerElemento.pk_CorridaExtrusion + " "]);



            primerArray.push(nuevoElemento);
            

            nuevoElemento = [];
            horasInicioFinal = [];
            operarioInicioFinal = [];
            
            
          }
        }
        
      }  

      this.corridasOrdenProduccion = primerArray;



    }

    this.corridasOrdenProduccionTotal = [];

    this.corridasOrdenProduccionTotal.push(totalTotalProducido.toFixed(2))
    this.corridasOrdenProduccionTotal.push(totalTotalTiempoEjecucion.toFixed(3))
    this.corridasOrdenProduccionTotal.push(totalTotalKilosHora.toFixed(3))


    if (this._buscarOrdenProduccionService.DescargarOrdenProduccionData == true) {
      var identificadorTiempoDeEspera = setTimeout(this.funcionConRetraso, 500);  
    } else {
      
    }

    // console.log(this.corridasOrdenProduccion);
    
    this.ordenarRetalColumnas(this.corridasOrdenProduccion);
    
    this.claseConsecutivo(this.corridasOrdenProduccion)

    
    
  }

  ordenarRetalColumnas(corridasOrdenProduccion: any){
    // console.log(corridasOrdenProduccion);


    var arrayCambiar = corridasOrdenProduccion[0][6][1];
    // console.log(arrayCambiar);

    // console.log(corridasOrdenProduccion);
    
    // for (let b = 0; b < corridasOrdenProduccion.length; b++) {

    //   // console.log(corridasOrdenProduccion[b][6][1]);
    //   // if (condition) {
        
    //   // }
      
    //   for (let c = 0; c < corridasOrdenProduccion[b][6][1].length; c = c + 2) {
    //     if (corridasOrdenProduccion[b][6][1][c] != " ") {
    //       console.log(corridasOrdenProduccion[b][6][1][c]);  
    //     }
        
    //   }


    // //  console.log(corridasOrdenProduccion[b][6][1]);
    // }

    // var nuevoArray = []
    
    for (let a = 0; a < arrayCambiar.length; a = a + 2) {
      var nuevoArray = [];

      // console.log(arrayCambiar[a]);
      
      
      if (arrayCambiar[a] != " ") {
        // var nuevoArray = [];
        for (let b = 0; b < corridasOrdenProduccion.length; b++) {
          
          if (b > 0) {
            nuevoArray = [];

            for (let c = 0; c < corridasOrdenProduccion[b][6][1].length; c = c + 2) {
  
              if (corridasOrdenProduccion[b][6][1][c] != " ") {
  
                if (corridasOrdenProduccion[b][6][1][c] == arrayCambiar[a]) {                
                  // nuevoArray.push(corridasOrdenProduccion[b][6][1][c])
                  nuevoArray.splice(a,0,corridasOrdenProduccion[b][6][1][c]);
                  nuevoArray.splice(a + 1,0,corridasOrdenProduccion[b][6][1][c + 1]);
                }else{
                  nuevoArray.push(corridasOrdenProduccion[b][6][1][c]);
                  nuevoArray.push(corridasOrdenProduccion[b][6][1][c + 1]);
                }
                
                
                // console.log(corridasOrdenProduccion[b][6][1][c]);
  
                // console.log(arrayCambiar[a]);
                // console.log(corridasOrdenProduccion[b][6][1][c]);  
  
              }
  
             
            }
    
            corridasOrdenProduccion[b][6][1] = nuevoArray
            // console.log(nuevoArray);  
          } 
          
          

        }  
      }

      // console.log(nuevoArray);

      // for (let b = 0; b < corridasOrdenProduccion.length; b++) {

      //   for (let c = 0; c < .length; c++) {
      //     const element = array[c];
          
      //   }

      //   if (corridasOrdenProduccion[b][6][1] == arrayCambiar[a]) {
          
      //   }  
      // }
      
      // if (arrayCambiar[a] != ' ') {

      //   for (let b = 0; b < antiguoArray.length; b = b + 2) {

      //     if (antiguoArray[b] == arrayCambiar[a]) {
      //       nuevoArray.push(antiguoArray[b])
      //       nuevoArray.push(antiguoArray[b + 1])
      //     } else {
            
      //     }
          

      //     // antiguoArray[b]
          
      //     // const element = array[b];
          
      //   }
      //   // console.log(arrayCambiar[a]);  
      // }else{
      //   nuevoArray.push(" ")
      //   nuevoArray.push(" ")
      // }

      
      
      
    }
    
    
    


    // for (let index = 0; index < corridasOrdenProduccion.length; index++) {
    //   var antiguoArray = corridasOrdenProduccion[index][6][1];
    //   var nuevoArray = [];

    //   // console.log(antiguoArray);
      
    //   if (index > 0) {
        
        
    //     // for (let index = 0; index < corridasOrdenProduccion[1].length; index++) {
    //     //   const element = array[index];
          
    //     // }
    //     console.log(corridasOrdenProduccion[index]);  
    //   }

      
    //   console.log(nuevoArray);
      
      
      
      
    // }
    
  }



  claseConsecutivo(corridasOrdenProduccion: any){


    for (const key in corridasOrdenProduccion) {
      var clases: any = [];
      for (const key2 in corridasOrdenProduccion[key][4][1]) {


        clases.push('informacion-table-tbody-td-string material-salida')
        clases.push('informacion-table-tbody-td-number material-salida')
        
      
        
      }

      this.corridasOrdenProduccion[key][4].push(clases)
    }

    
    
  }

  totalDevolucion(){

    var array: any = [];
    var array2: any = [];
    var array3: any = [];
    var array4: any = [];
    var total: any = 0;

    for (const key in this.corridaExtrusionDesperdicio) {

      array2.push(this.corridaExtrusionDesperdicio[key][1])
      total += this.corridaExtrusionDesperdicio[key][0];
      
    }

    array.push(total)
    

    for (let index = 0; index < array2.length; index++) {
      for (let i = 0; i < array2[index].length; i = i + 2) {
        if (array2[index][i] != " ") {
          if (array3[array2[index][i]] == undefined) {
            array3[array2[index][i]] = array2[index][i + 1]    
          } else {
            array3[array2[index][i]] += array2[index][i + 1]    
            
          }
          
        }
        
      }
    }

    array.push([])
    for (const key in array3) {
      array[1].push(key)
      array4.push("informacion-table-tbody-td-string material-salida")
      array[1].push(array3[key])
      array4.push("informacion-table-tbody-td-number material-salida")
    }

    
    this.TotalDevolucion = array;
    this.TotalDevolucionClases = array4;
  }

  funcionConRetraso() {
    var title = 'angular-app';
    var fileName= 'ExcelSheet.xlsx';


    let element1 = document.getElementById('excel-table');
    try {
      const ws1: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element1,);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      
      XLSX.utils.book_append_sheet(wb, ws1, 'Sheet1');


      XLSX.writeFile(wb, fileName);
    } catch (error) {
      
    }
    
  }


  // This funtion obtain all the data of the Corridas in one Orden de produccion and return the material salida sorted
  ordenarMaterialSalida(data: any){


    var corridaExtrusionMaterialSalida: any = [];
    var corridaExtrusionMaterialSalidaCorrida: any = [];
    var sumaPesoRolloCorrida: any = 0;

    if (data[2][0].length != 0) {
      var pkcorridaExtrusion = 0;
      
      for (let index = 0; index < data[2][0].length; index++) {

        var key = data[2][0][index].pk_CorridaExtrusion.toString()
        
        if ( corridaExtrusionMaterialSalida[ key + " " ] == undefined ) {
          sumaPesoRolloCorrida = 0;

          corridaExtrusionMaterialSalidaCorrida = [];
          sumaPesoRolloCorrida = sumaPesoRolloCorrida + data[2][0][index].pesoNetoRollo;

          corridaExtrusionMaterialSalidaCorrida.push((data[2][0][index].noLote).substring( (data[2][0][index].noLote).indexOf('-') + 1) , );
          corridaExtrusionMaterialSalidaCorrida.push(data[2][0][index].pesoNetoRollo);

          corridaExtrusionMaterialSalida[ key + " " ] = [sumaPesoRolloCorrida, corridaExtrusionMaterialSalidaCorrida];
        }else{  
          sumaPesoRolloCorrida = sumaPesoRolloCorrida + data[2][0][index].pesoNetoRollo;


          corridaExtrusionMaterialSalidaCorrida.push((data[2][0][index].noLote).substring( (data[2][0][index].noLote).indexOf('-') + 1) , );
          corridaExtrusionMaterialSalidaCorrida.push(data[2][0][index].pesoNetoRollo);
          
          corridaExtrusionMaterialSalida[ key + " " ] = [sumaPesoRolloCorrida, corridaExtrusionMaterialSalidaCorrida];  
        }


      }
    }


    this.buscarMayor(corridaExtrusionMaterialSalida);
    var retornoCorridaExtrusionMaterialSalida = this.organizarCorridaExtrusionMaterialSalida(corridaExtrusionMaterialSalida);

    return corridaExtrusionMaterialSalida;

  }

  mayor: any = 0;

  buscarMayor(data: any){

    for (const key in data) {

      if (this.mayor < data[key][1].length) {
        this.mayor = data[key][1].length;
      } else {
      }

    }

  }

  organizarCorridaExtrusionMaterialSalida(corridaExtrusionMaterialSalida: any){
    for (const key in corridaExtrusionMaterialSalida) {

      var valor = this.mayor - corridaExtrusionMaterialSalida[key][1].length;

      for (let index = 0; index < valor; index++) {
        
        
        corridaExtrusionMaterialSalida[key][1].push(" "); 
      }

    }

  }

  // This funtion obtain all the data of all Corridas in one Orden de produccion and return the Tiempos paro sorted
  ordenarTiemposParo(data: any){

    var corridaExtrusionTiemposParo: any = [];
    var corridaExtrusionTiemposParoCorrida: any = [];
    var array: any = [];
    var sumaTiempoParo: any = 0;

    if (data[1][0].length != 0) {
      
      for (let index = 0; index < data[1][0].length; index++) {

        var key = data[1][0][index].pk_CorridaExtrusion
        
        if ( corridaExtrusionTiemposParo[ key + " " ] == undefined ) {

          

          sumaTiempoParo = 0;

          this.fechaInicio = new Date(data[1][0][index].fechaInicio).getTime();

          this.fechaFin = new Date(data[1][0][index].fechaFinal).getTime();
    
          var resta = this.fechaFin - this.fechaInicio;
          var horas = resta/(1000*60*60);

          sumaTiempoParo = sumaTiempoParo + horas;

          array[0] = sumaTiempoParo;
          

          corridaExtrusionTiemposParoCorrida.push(data[1][0][index].fechaInicio);
          corridaExtrusionTiemposParoCorrida.push(data[1][0][index].fechaFinal);
          corridaExtrusionTiemposParoCorrida.push(sumaTiempoParo);
          array.push(corridaExtrusionTiemposParoCorrida)
          corridaExtrusionTiemposParo[ key + " " ] = array;  

          corridaExtrusionTiemposParoCorrida = [];

          array = [];
          
        }else{  

          this.fechaInicio = new Date(data[1][0][index].fechaInicio).getTime();

          this.fechaFin = new Date(data[1][0][index].fechaFinal).getTime();
    
          var resta = this.fechaFin - this.fechaInicio;
          var horas = resta/(1000*60*60);

          sumaTiempoParo = sumaTiempoParo + horas;

          corridaExtrusionTiemposParo[ key + " " ][0] += sumaTiempoParo;

          corridaExtrusionTiemposParoCorrida.push(data[1][0][index].fechaInicio);
          corridaExtrusionTiemposParoCorrida.push(data[1][0][index].fechaFinal);
          corridaExtrusionTiemposParoCorrida.push(sumaTiempoParo);
          corridaExtrusionTiemposParo[ key + " " ].push( corridaExtrusionTiemposParoCorrida );  

          array = [];
          corridaExtrusionTiemposParoCorrida = [];
        }
        
      }

    }

    return corridaExtrusionTiemposParo;


  }

  // This funtion obtain all the data of all Corridas in one Orden de produccion and return the retal sorted
  ordenarRetal(data: any){

    var corridaExtrusionRetal: any = [];
    var corridaExtrusionRetalCorrida: any = [];
    var array: any = [];
    var sumaRetal: any = 0;

    if (data[3][0].length != 0) {
      
      for (let index = 0; index < data[3][0].length; index++) {

        var key = data[3][0][index].pk_CorridaExtrusion;

        
        if ( corridaExtrusionRetal[ key + " " ] == undefined ) {

          sumaRetal = 0;
          if (corridaExtrusionRetal[ key + " " ] == undefined) {
            sumaRetal = data[3][0][index].cantidad;
            corridaExtrusionRetalCorrida.push(data[3][0][index].codigo);
            corridaExtrusionRetalCorrida.push(data[3][0][index].cantidad);
            corridaExtrusionRetal[ key + " " ] = [sumaRetal, corridaExtrusionRetalCorrida];  
          }else{
            try {
              corridaExtrusionRetal[ key + " " ][0] += data[3][0][index].cantidad;  
              corridaExtrusionRetal[ key + " " ][1].push(data[3][0][index].codigo)
              corridaExtrusionRetal[ key + " " ][1].push(data[3][0][index].cantidad)
            } catch (error) {
              
            }
          }
          
          // console.log(corridaExtrusionRetalCorrida);
          
          array.push(corridaExtrusionRetalCorrida)
          

          corridaExtrusionRetalCorrida = [];

          array = [];
          sumaRetal = 0
        }else{  
          if (corridaExtrusionRetal[ key + " " ] == undefined) {
            sumaRetal = data[3][0][index].cantidad
            corridaExtrusionRetalCorrida.push(data[3][0][index].codigo);
            corridaExtrusionRetalCorrida.push(data[3][0][index].cantidad);
            corridaExtrusionRetal[ key + " " ] = [sumaRetal, corridaExtrusionRetalCorrida];  
          }else{
            try {
              corridaExtrusionRetal[ key + " " ][0] += data[3][0][index].cantidad;  
              corridaExtrusionRetal[ key + " " ][1].push(data[3][0][index].codigo)
              corridaExtrusionRetal[ key + " " ][1].push(data[3][0][index].cantidad)
            } catch (error) {
              
            }
          }
          

          array = [];
          corridaExtrusionRetalCorrida = [];
          sumaRetal = 0
        }
        
      }
    }

    // console.log(corridaExtrusionRetal);

    this.buscarMayorRetal(corridaExtrusionRetal);
    this.corridaExtrusionDesperdicio = corridaExtrusionRetal;
    var retornoCorridaExtrusionRetal = this.organizarCorridaExtrusionRetal(corridaExtrusionRetal);


    // console.log(corridaExtrusionRetal);
    

    return corridaExtrusionRetal;

  }

  mayorRetal: any = 0;
  buscarMayorRetal(corridaExtrusionRetal: any){
    for (const key in corridaExtrusionRetal) {

      if (this.mayorRetal < corridaExtrusionRetal[key][1].length) {
        this.mayorRetal = corridaExtrusionRetal[key][1].length;
      } else {
      }

    }

  }


  organizarCorridaExtrusionRetal(corridaExtrusionRetal: any){

    for (const key in corridaExtrusionRetal) {


      var valor = this.mayorRetal - corridaExtrusionRetal[key][1].length;

      for (let index = 0; index < valor; index++) {
        
        
        corridaExtrusionRetal[key][1].push(" "); 
      }

    }


  }

  // This funtion obtain all the data of all Corridas in one Orden de produccion and return the Observaciones sorted
  ordenarObservacion(data: any){
    var corridaExtrusionObservacion: any = [];
    var corridaExtrusionObservacionCorrida: any = [];
    var array: any = [];

    if (data[4][0].length != 0) {

      
      for (let index = 0; index < data[4][0].length; index++) {

        var key = data[4][0][index].pk_CorridaExtrusion;

        
        if ( corridaExtrusionObservacion[ key + " " ] == undefined ) {

          corridaExtrusionObservacionCorrida.push(data[4][0][index].descripcion);
          array.push(corridaExtrusionObservacionCorrida)
          corridaExtrusionObservacion[ key + " " ] = array;  

          corridaExtrusionObservacionCorrida = [];

          array = [];
          
        }else{  
          corridaExtrusionObservacionCorrida.push(data[4][0][index].descripcion);
          corridaExtrusionObservacion[ key + " " ].push(corridaExtrusionObservacionCorrida);  

          array = [];
          corridaExtrusionObservacionCorrida = [];
        }
        
      }
    }

    this.buscarMayorObservacion(corridaExtrusionObservacion);
    var retornoCorridaExtrusionObservacion = this.organizarCorridaExtrusionObservacion(corridaExtrusionObservacion);

    return corridaExtrusionObservacion;
  }

  mayorObservacion: any = 0;
  buscarMayorObservacion(corridaExtrusionObservacion:any){
    for (const key in corridaExtrusionObservacion) {

      if (this.mayorObservacion < corridaExtrusionObservacion[key].length) {
        this.mayorObservacion = corridaExtrusionObservacion[key].length;
      } else {
      }


    }

  }

  organizarCorridaExtrusionObservacion(corridaExtrusionObservacion){
    
    for (const key in corridaExtrusionObservacion) {
      var valor = this.mayorRetal - corridaExtrusionObservacion[key].length;

      for (let index = 0; index < valor; index++) {
        
        
        corridaExtrusionObservacion[key].push(" "); 
      }

    }
  }


  ordenarMateriaPrimaExtrusion(data: any){

    var consumoMPriExtrusion:any = [];
    var array:any = [];

    this.consumoMPriExtrusionSend = [];
    this.consumoMPriExtrusionSendTotal = 0;

    for (const key in data) {

      if (consumoMPriExtrusion[ data[key].fk_MPri ] != undefined) {
        consumoMPriExtrusion[ data[key].fk_MPri ][0] += data[key].cantidadConsumida;
      } else {
        array.push(data[key].cantidadConsumida);
        array.push(data[key].descripcion);
        consumoMPriExtrusion[ data[key].fk_MPri ] = array;
        array = [];
      }

    } 
    
    var elemento = 0;
    for (const key in consumoMPriExtrusion) {
      consumoMPriExtrusion[key].push(key);
      this.consumoMPriExtrusionSend.push(consumoMPriExtrusion[key]);
      elemento += consumoMPriExtrusion[key][0];
      
      this.consumoMPriExtrusionSendTotal = elemento;
      
    }

  }


  // The bellow function sorted the data in Devolucion
  ordenarMateriaPrimaExtrusionDevolucion(data: any){

    var consumoMPriExtrusion:any = [];
    var array:any = [];

    this.consumoMPriExtrusionSendDevolucion = [];
    this.consumoMPriExtrusionSendTotalDevolucion = [];

    for (const key in data) {

      if (consumoMPriExtrusion[ data[key].fk_MPri ] != undefined) {
        consumoMPriExtrusion[ data[key].fk_MPri ][0] += data[key].cantidad;
      } else {
        array.push(data[key].cantidad);
        array.push(data[key].descripcion);
        consumoMPriExtrusion[ data[key].fk_MPri ] = array;
        array = [];
      }

    } 
    
    var elemento = 0;
    for (const key in consumoMPriExtrusion) {
      consumoMPriExtrusion[key].push(key);
      this.consumoMPriExtrusionSendDevolucion.push(consumoMPriExtrusion[key]);
      elemento += consumoMPriExtrusion[key][0];
      
      this.consumoMPriExtrusionSendTotalDevolucion = elemento;
      
    }

  }


  // This function allow to merge the data of materia prima and devolucion 
  unirDevolucionMateriaPrimaExtrusion( consumoMPriExtrusionSend:any , consumoMPriExtrusionSendDevolucion: any){

    for (const key in this.consumoMPriExtrusionSend) {

      for (const key2 in this.consumoMPriExtrusionSendDevolucion) {

        if (this.consumoMPriExtrusionSend[key][2] == this.consumoMPriExtrusionSendDevolucion[key2][2]) {  
          this.consumoMPriExtrusionSend[key].push(this.consumoMPriExtrusionSendDevolucion[key2][0])
        }
      }
    }

  }



  // That's for get the cuadre
  obtenereCuadre(){

    this.ordenProduccionCuadre = this.consumoMPriExtrusionSendTotal - (Number(this.TotalDevolucion[0]) + Number(this.corridasOrdenProduccionTotal[0]));
  }

  // That's for get the Desviacion
  obtenereDesviacion(){

    this.ordenProduccionDesviacion = this.ordenProduccionCuadre / this.consumoMPriExtrusionSendTotal * 100;

  }

  buscarTransferencia(){
    this._buscarOrdenProduccionService.getOrdenProduccion(this.ordenProduccionBuscar).subscribe(data => {

      this.transferido = data;
      this.totalTransferencia(data);
       
    }, error => {
      console.log(error);
    })  
  }

  totalTransferencia(data: any){
    this.totalTransferenciaValor = 0;
    for (let index = 0; index < data.length; index++) {
      this.totalTransferenciaValor += data[index].cantidadConsumida;
      
    }
  }

  
  title = 'angular-app';
  fileName= 'ExcelSheet.xlsx';

  // This code of here, it's that allows me to download the data on excel documents
  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('informacion-corridas table-bordered');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    let element2 = document.getElementById('tabla-total-resumen-orden table table-bordered');
    const ws2: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element2);

    let element3 = document.getElementById('tabla-consecutivo-peso table table-bordered');
    const ws3: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element3);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.utils.book_append_sheet(wb, ws2, 'Sheet2');
    XLSX.utils.book_append_sheet(wb, ws3, 'Sheet3');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }


  descargarExcelDatos(){
    var nuevoArray = [];
    console.log(this.corridasOrdenProduccion);
    var a = [];
    for (const key in this.corridasOrdenProduccion) {
      a = [];
      a.push(this.corridasOrdenProduccion[key][3][0])
      a.push(this.corridasOrdenProduccion[key][2][0])
      a.push(this.corridasOrdenProduccion[key][3][1])
      a.push(this.corridasOrdenProduccion[key][2][1])
      a.push(this.corridasOrdenProduccion[key][0])
      a.push(this.corridasOrdenProduccion[key][5][0])

      for (const key2 in this.corridasOrdenProduccion[key][4][1]) {
        a.push(this.corridasOrdenProduccion[key][4][1][key2])
      }


      a.push(this.corridasOrdenProduccion[key][4][0])
      a.push(this.corridasOrdenProduccion[key][7])
      a.push(this.corridasOrdenProduccion[key][8])

      for (const key2 in this.corridasOrdenProduccion[key][6][1]) {
        a.push(this.corridasOrdenProduccion[key][6][1][key2])
      }

      a.push(this.corridasOrdenProduccion[key][6][0])

      // for (const key2 in this.corridasOrdenProduccion[key][9]) {
      //   a.push(this.corridasOrdenProduccion[key][9][key2])
      // }


      nuevoArray.push(a)
      
    }

    a = [];
    a.push(" ")
    a.push(" ")
    a.push(" ")
    a.push(" ")
    a.push(" ")
    a.push(" ")

    // console.log(this.corridasOrdenProduccion[0][4][1].length);
    for (let index = 0; index < this.corridasOrdenProduccion[0][4][1].length; index++) {
      a.push(" ")
    }
    

    a.push(this.corridasOrdenProduccionTotal[0])
    a.push(this.corridasOrdenProduccionTotal[1])
    a.push(this.corridasOrdenProduccionTotal[2])
    for (const key in this.TotalDevolucion[1]) {
      a.push(this.TotalDevolucion[1][key])
    }
    a.push(this.TotalDevolucion[0])
    nuevoArray.push(a)
    
    console.log(nuevoArray);
  

    const header = ["OPERARIO INICIO", "FECHA/HORA DE INICIO", "OPERARIO FINAL", "FECHA/HORA DE FINAL", "TIEMPO DE AJUSTE", "TIEMPO DE PARO", "CANTIDAD", "TOTAL PRODUCIDO", "TIEMPO EJECUCION", "KILOS/HORA", "DESPERDICIO", "TOTAL DESPERDICIO"]
    this.excelService.generateExcel2(nuevoArray, header);
    
  }
  

}