import { Component, OnChanges, HostListener, ElementRef, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { CorridaService } from 'src/app/services/corrida.service';
import { OperarioService } from 'src/app/services/operario.service';
import { ToastrService } from 'ngx-toastr';
import * as $ from "jquery";
import { DatePipe } from '@angular/common';

import { OrdenProduccionService } from 'src/app/services/orden-produccion.service';
import { DevolucionService } from 'src/app/services/devolucion.service';


import { RetalService } from 'src/app/services/retal.service';
import { ConsumoMPriExtrusionService } from 'src/app/services/consumo-mpri-extrusion.service';
import { MaterialService } from 'src/app/services/material.service';


@Component({
  selector: 'app-corrida-extrusion-principal',
  templateUrl: './corrida-extrusion-principal.component.html',
  styleUrls: ['./corrida-extrusion-principal.component.css']
})
export class CorridaExtrusionPrincipalComponent {

  @Output() maquina = new EventEmitter();
  @Input() OperarioActulizarInicio: any;
  @Input() OperarioActulizarFinalizar: any;
  
  
  ngOnInit(): void {
   
    // With the following code i get the objects that are save in local storage when i have start the Corrida
    // In fact that allows me to start the corrida and save the data
    var ndatos = JSON.parse(localStorage.getItem("datos") || '{}');
    var nentrada = JSON.parse(localStorage.getItem("entrada") || '{}');
    var ninsertar = JSON.parse(localStorage.getItem("insertar") || 'false');


    // This condition of here verify the insert to another Corrida
    if (ninsertar) {

      this.insertarCorrida(ndatos, nentrada);

      // I restart the data
      window.onbeforeunload = function() {
        localStorage.setItem("datos", JSON.stringify([]));
        localStorage.setItem("entrada", JSON.stringify([]));
        localStorage.setItem("insertar", JSON.stringify(false));
      }
    } 

  }
  
  ngOnChanges(): void {
  }

  // It inserts the corrida
  insertarCorrida(corrida: any, entrada: any){
    
    this._corridaService.saveCorridaExtrusion(corrida).subscribe(data => {
      // this is for enable the button
      this._corridaService.boton = true;

      // There are any data that it's send to the services
      if (this._corridaService.InformacionActualizar) {
        this._corridaService.InformacionActualizar = false;
      }else{
        this._corridaService.InformacionActualizar = true;
      }

      this._corridaService.OperarioCorridaExtrusionInicio = entrada;
      this._corridaService.InformacionActualizarInicioFinal = true;


      if (this._devolucionService.DevolucionActualizar) {
        this._devolucionService.DevolucionActualizar = false
      }else{
        this._devolucionService.DevolucionActualizar = true
      }


      this.maquina.emit(corrida.maquina);

      this._corridaService.CorridaExtrusion = data;

      this.insertarOperarioCorridaExtrusion(entrada, data.pk_CorridaExtrusion);

      this.activarFinalizarCorrida(true);
      
      if (this._corridaService.ActualizarMenu) {
        this._corridaService.ActualizarMenu = false
      } else {
        this._corridaService.ActualizarMenu = true
      }


      this._corridaService.CorridaExtrusionFinalDesactivar = true;


      
    }, error => {
      console.log(error);
    })
  }

  // Inserts the operator of the corrida extrusion
  insertarOperarioCorridaExtrusion(entrada: any, pk_CorridaExtrusion: number){


    // console.log(pk_CorridaExtrusion);
    
    const operarioCorrida: any = {
      fk_CorridaExtrusion: pk_CorridaExtrusion,
      fk_Operario: entrada.operarioIncial,
      fechaHora: entrada.fechaInicial,
    }

    // this.buscarOperarioCorridaExtrusion(pk_CorridaExtrusion);

    this._operarioService.saveOperarioCorridaExtrusion(operarioCorrida).subscribe(data => {
      
      if (this._operarioService.OperarioActulizarInicio) {
        this._operarioService.OperarioActulizarInicio = false;    
      }else{
        this._operarioService.OperarioActulizarInicio = true;
      }


      this._operarioService.DatosOperarioCorridaInicio = data;

      delete this._operarioService.DatosOperarioCorridaInicio['pk_OperarioCorridaExtrusion']

      this._corridaService.AceptarMaterialSalida = true;
      this._corridaService.AceptarRetalExtrusion = true;
      this._corridaService.AceptarTiempoParo = true;
      this._corridaService.AceptarObservacion = true;
      this._corridaService.AceptarTorta = true;
      this._corridaService.AceptarDevolucion = true;
      this._corridaService.AceptarRetal = true;
      this._corridaService.AceptarMPri = true;

      
      this._corridaService.DatosOperarioCorridaInicio = operarioCorrida;
      

    

    }, error => {
      console.log(error);
    })



  }

  // buscarOperarioCorridaExtrusion(pk_CorridaExtrusion){
  //   this._operarioService.getOperario(pk_CorridaExtrusion).subscribe(data => {
      
  //   // console.log(data);
  //   if (data.length == 0) {
  //     this.toastr.success('Imposible iniciar corrida el operario no existe', 'Error al iniciar corrida');
  //   }
    

  //   }, error => {
  //     console.log(error);
  //   })
  // }

  iniciarNuevaCorrida!: boolean | false;
  corridaIniciada!: boolean | false;
  finalizarCorrida!: boolean | false;


  constructor( 
    public _corridaService: CorridaService,
    private toastr: ToastrService,
    private _operarioService: OperarioService,
    private _devolucionService: DevolucionService,
    private _ordenProduccionService: OrdenProduccionService,
    private _retalService: RetalService,
    private _consumoMPriExtrusionService: ConsumoMPriExtrusionService,
    private _materialService: MaterialService,
    private datepipe: DatePipe,
    ) {
  }

  // This functions allows enable and disable the component of Corrida Extrusion Final and Corrida Extrusion Inicio
  IniciarNuevaCorrida(){
    this.iniciarNuevaCorrida = true;
  }

  cerrarExtrusionInicio(entrada: any){
    this.iniciarNuevaCorrida = entrada
  }

  FinalizarCorrida(){
    this.finalizarCorrida = true
  }

  cerrarExtrusionFinal(entrada: any){
    this.finalizarCorrida = entrada
  }

  activarFinalizarCorrida(entrada: any){
    this.corridaIniciada = entrada;
  }

  enviarMaquina(entrada: any){
    this.maquina.emit(entrada);
  }

}
