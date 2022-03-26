import { Component, OnInit, Input } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OperarioService } from 'src/app/services/operario.service';
import { MaterialService } from 'src/app/services/material.service';
import { ReprocesoService } from 'src/app/services/reproceso.service';
import { CorridaService } from 'src/app/services/corrida.service';


@Component({
  selector: 'app-informacion-general-inicio',
  templateUrl: './informacion-general-inicio.component.html',
  styleUrls: ['./informacion-general-inicio.component.css']
})
export class InformacionGeneralInicioComponent {

  @Input() ActualizarInformacion: any;
 
  constructor(
    private _operarioService: OperarioService, 
    public _reprocesoService: ReprocesoService,
    public _materialService: MaterialService,
    public _corridaService: CorridaService,
  ) 
  {

  }

  ngOnChanges(): void {
    
    this.buscarNombreOperario();


    var informacionGeneralCorrida: any = [];
    informacionGeneralCorrida.push(this.inicioCorrida);
    informacionGeneralCorrida.push(this.finalCorrida);
    informacionGeneralCorrida.push(this.DuracionCorrida);
    var array : any =[];
    array[0] = informacionGeneralCorrida;

    if (this._corridaService.numeroCorridaPagination == 0) {
      this._corridaService.AlmacenarInformacionCorrida[1] = array;

    }else{
      this._corridaService.AlmacenarInformacionCorrida[this._corridaService.numeroCorridaPagination] = array;  
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

  
  // This function search the driver's name
  buscarNombreOperario(){
    
    this.InformacionActualizarInicioFinal = this._corridaService.InformacionActualizarInicioFinal;
    if (this._corridaService.InformacionActualizarInicioFinal) {
      this.OperarioCorridaExtrusion = this._corridaService.OperarioCorridaExtrusionInicio;  
    }else{
      this.OperarioCorridaExtrusion = this._corridaService.OperarioCorridaExtrusionFinal;  
    }

    
    
    try {

      this.OperarioCorridaExtrusion.operarioIncial = this._corridaService.DatosCorridaNoFinalizada[3][0][0].pk_Operario;
      this.OperarioCorridaExtrusion.fechaInicial = this._corridaService.DatosCorridaNoFinalizada[3][0][0].fechaHora;
    } catch (error) {
      
    }
    
    if (this.OperarioCorridaExtrusion.operarioIncial) {

      // It gets all the data of the driver of the corrida's start
      this._operarioService.getOperario(this.OperarioCorridaExtrusion.operarioIncial).subscribe(data => {
        

        this._materialService.MaterialSalidaVer.push(data);
        this._reprocesoService.ReprocesoVer.push(data);

        this.inicioCorrida.push(data[0].nombre)
       
        this.fechaInicio = this.fechaFin = new Date(this.OperarioCorridaExtrusion.fechaInicial).getTime();

        var fechaInicial = this.OperarioCorridaExtrusion.fechaInicial.substr(0,10);
        var horaInicial = this.OperarioCorridaExtrusion.fechaInicial.substr(10 + 1,);
        if (this._corridaService.CorridaNoFinalizadaActivar) {
          var tiempoAjuste = this._corridaService.DatosCorridaNoFinalizada[2][0][0].tiempoAjuste;
        }else{
          var tiempoAjuste = this.OperarioCorridaExtrusion.tiempoAjuste;
        }
        
  
        this.inicioCorrida.push(fechaInicial)
        this.inicioCorrida.push(horaInicial)    
        this.inicioCorrida.push(tiempoAjuste)   
        

        this._corridaService.DatosOperarioCorridaInicio = this.OperarioCorridaExtrusion.fechaInicial;
      }, error => {
        console.log(error);
      })  
    }

    if (this.OperarioCorridaExtrusion.operarioFinal) {
 
      // It gets all the data of the driver of the corrida's end
      this._operarioService.getOperario(this.OperarioCorridaExtrusion.operarioFinal).subscribe(data => {

        this.finalCorrida.push(data[0].nombre)
      
        // That's for count the hours of the corrida's execution
        this.fechaFin = new Date(this.OperarioCorridaExtrusion.fechaFinal).getTime();

        var fechaFinal = this.OperarioCorridaExtrusion.fechaFinal.substr(0,10);
        var horaFinal = this.OperarioCorridaExtrusion.fechaFinal.substr(10 + 1,);
  
        var resta = this.fechaFin - this.fechaInicio;
        var horas = resta/(1000*60*60);

        this.DuracionCorrida = horas.toFixed(2);

        this._corridaService.ActualizarDuracionCorrida = true;
        this._corridaService.DuracionCorrida = this.DuracionCorrida;

        this.finalCorrida.push(fechaFinal)
        this.finalCorrida.push(horaFinal)   
  
      }, error => {
        console.log(error);
      })  
    }

  }

}
