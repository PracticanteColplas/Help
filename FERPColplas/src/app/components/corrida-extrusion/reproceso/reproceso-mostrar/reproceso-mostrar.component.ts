import { Component, OnInit, OnChanges, SimpleChanges, Input, EventEmitter, Output} from '@angular/core';

import { CorridaService } from 'src/app/services/corrida.service';
import { ReprocesoService } from 'src/app/services/reproceso.service';

@Component({
  selector: 'app-reproceso-mostrar',
  templateUrl: './reproceso-mostrar.component.html',
  styleUrls: ['./reproceso-mostrar.component.css']
})
export class ReprocesoMostrarComponent implements OnChanges {

  @Input() ReprocesoActualizar: any;
  @Input() ReprocesoPermiso: any;
  @Output() cambioEditarReproceso = new EventEmitter();
  @Output() cambioVerReproceso = new EventEmitter();

  CorridasExtrusion : any[] = [
  ];
  Reproceso : any[] = [
  ];
  ListaReprocesosColumnas : any[] = [
  ];
  


  constructor(
    public _corridaService: CorridaService,
    public _reprocesoService: ReprocesoService,
  ) 
  { 
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.CorridasExtrusion = [];
    try {
      this.CorridasExtrusion.push(this._corridaService.DatosCorridaNoFinalizada)  
      this.CorridasExtrusion.push(this._corridaService.CorridaExtrusion)  

    } catch (error) {
      
    }


    try {
      if (this.CorridasExtrusion) {
        this.obterReproceso();  
  
        var reprocesoCorrrida: any = [];
        reprocesoCorrrida.push(this.ListaReprocesosColumnas);
    
        if (this._corridaService.numeroCorridaPagination == 0) {
          this._corridaService.AlmacenarInformacionCorrida[1][2] = reprocesoCorrrida;    
        }else{
          this._corridaService.AlmacenarInformacionCorrida[this._corridaService.numeroCorridaPagination][2] = reprocesoCorrrida;  
        }

      }  
    } catch (error) {
      
    }
    
  }

  // This function get all the data related to the Corrida
  obterReproceso(){

    var pk: any;
    if (this.CorridasExtrusion[0].length > 0) {

      pk = this.CorridasExtrusion[0][2][0][0].pk_CorridaExtrusion;

    }
    if (this.CorridasExtrusion[1].pk_CorridaExtrusion != undefined) {
      pk = this.CorridasExtrusion[1].pk_CorridaExtrusion;
    }

    try {
      if (pk != undefined) {
        this._reprocesoService.countReprocesoExtrusion(pk).subscribe(data => {
          this.Reproceso = data[0];
          this.organizarDataMostrar(this.Reproceso);
          this._reprocesoService.ReprocesoPermisoEditar = true;
        }, error => {
          console.log(error);
        })
      }
    } catch (error) {
      
    }
    

    
  }

  // this function sorts the elements that will go to show 
  organizarDataMostrar(MaterialSalida: any){

    var primeraList : any[] = [
    ];
    var cuartaList : any[] = [
    ];


    var i = MaterialSalida.length;


    this.ListaReprocesosColumnas = [];

    for (let index = 1; index <= i; index++) {

      var valor = index % 2;

      
      if ( valor == 1  ) {
        primeraList.push(this.Reproceso.slice(index - 1)[0]);


        if (this.ListaReprocesosColumnas[0]) {
          if  (JSON.stringify(this.ListaReprocesosColumnas).includes( JSON.stringify(primeraList).slice(1, -1) )) {
          }else{
            this.ListaReprocesosColumnas[0].push(primeraList[0])
          }
          
        }else{
          this.ListaReprocesosColumnas[0] = primeraList;
        }

      }

      if ( valor == 0 ) {
        cuartaList.push(this.Reproceso.slice(index - 1)[0]);
        
        if (this.ListaReprocesosColumnas[3]) {

          if  (JSON.stringify(this.ListaReprocesosColumnas).includes( JSON.stringify(cuartaList).slice(1, -1) )) {
          }else{
            this.ListaReprocesosColumnas[3].push(cuartaList[0])
          }

        }else{
          this.ListaReprocesosColumnas[3] = cuartaList;
        }

      }

    }

  }

  // This function enable the component of reprocesoEditar
  editarReproceso(Reproceso: any, ListaReprocesosColumnas: any, ReprocesoNumero: any, ReprocesoNumero2: any){

    if (this._corridaService.AceptarMaterialSalida) {
      this._reprocesoService.Reproceso = Reproceso;

      this._reprocesoService.ReprocesoP = ReprocesoNumero;
      this._reprocesoService.ReprocesoS = ReprocesoNumero2;
      this._reprocesoService.Reprocesos = ListaReprocesosColumnas;

      var cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>
      cortina[0].style.visibility = 'visible';
      this.cambioEditarReproceso.emit(true)
    }
    
  }

  // This function enable the component of verReproceso
  verReproceso(Reproceso: any){
    this._reprocesoService.ReprocesoVer[2] = Reproceso;
    this._reprocesoService.ReprocesoPermisoVer = true;
    var cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>
    cortina[0].style.visibility = 'visible';
    this.cambioVerReproceso.emit(true)
  }

}