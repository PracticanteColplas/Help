import { Component, OnInit, OnChanges, SimpleChanges, Input, EventEmitter, Output} from '@angular/core';

import { CorridaService } from 'src/app/services/corrida.service';
import { MaterialService } from 'src/app/services/material.service';
import { OrdenProduccionService } from 'src/app/services/orden-produccion.service';

@Component({
  selector: 'app-material-salida-mostrar',
  templateUrl: './material-salida-mostrar.component.html',
  styleUrls: ['./material-salida-mostrar.component.css']
})
export class MaterialSalidaMostrarComponent {

  @Input() materialSalidaActualizar: any;
  @Output() cambioEditarMaterialSalida = new EventEmitter();
  @Output() cambioVerMaterialSalida = new EventEmitter();

  CorridasExtrusion : any[] = [
  ];
  MaterialSalida : any[] = [
  ];
  ListaMaterialesColumnas : any[] = [
  ];
  
  NoLote!: string | null;
  Actualizar!: boolean | null;


  constructor(
    public _corridaService: CorridaService,
    public _materialService: MaterialService,
    public _ordenProduccionService: OrdenProduccionService,
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

        this.obterMaterialSalida();  
  
        var materialSalidaCorrrida: any = [];
        materialSalidaCorrrida.push(this.ListaMaterialesColumnas);
  

        if (this._corridaService.numeroCorridaPagination == 0) {
          this._corridaService.AlmacenarInformacionCorrida[1][1] = materialSalidaCorrrida;  
        }else{
          
          this._corridaService.AlmacenarInformacionCorrida[this._corridaService.numeroCorridaPagination][1] = materialSalidaCorrrida;  
        }

      }  
    } catch (error) {
      
    }
    
  }


  // It obteins all the elements in materiales de salida
  obterMaterialSalida(){


    var pk: any;
    if (this.CorridasExtrusion[0].length > 0) {

      pk = this.CorridasExtrusion[0][2][0][0].pk_CorridaExtrusion;
      

    }
    if (this.CorridasExtrusion[1].pk_CorridaExtrusion != undefined) {
      pk = this.CorridasExtrusion[1].pk_CorridaExtrusion;
     
    }

    try {

      if (pk != undefined) {
        this._materialService.countMaterialSalidaExtrusion(pk).subscribe(data => {
          this.MaterialSalida = data[0];
          this.organizarDataMostrar(this.MaterialSalida);
          this._materialService.MaterialSalidaPermisoEditar = true;
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
    var segundaList : any[] = [
    ];
    var terceraList : any[] = [
    ];
    var cuartaList : any[] = [
    ];


    var i = this.MaterialSalida.length;

    var n = i;

    this.ListaMaterialesColumnas = [];

    for (let index = 1; index <= i; index++) {
      // it's with 4 'cause i will only show 4 columns
      var valor = index % 4;

      if ( valor == 1 ) {

        primeraList.push(this.MaterialSalida.slice(index - 1)[0]);
  
        if (this.ListaMaterialesColumnas[0]) {

          if  (JSON.stringify(this.ListaMaterialesColumnas).includes( JSON.stringify(primeraList).slice(1, -1) )) {
          }else{
            this.ListaMaterialesColumnas[0].push(primeraList[0])
          }
          
        }else{
          this.ListaMaterialesColumnas[0] = primeraList;
        }
  
      }
      
      if ( valor == 2) {
        segundaList.push(this.MaterialSalida.slice(index - 1)[0]);
    
        if (this.ListaMaterialesColumnas[1]) {
  
          if  (JSON.stringify(this.ListaMaterialesColumnas).includes( JSON.stringify(segundaList).slice(1, -1) )) {
          }else{
            this.ListaMaterialesColumnas[1].push(segundaList[0])
          }
          
        }else{
          this.ListaMaterialesColumnas[1] = segundaList;
        }
      }
  
      if ( valor == 3 ) {    
        terceraList.push(this.MaterialSalida.slice(index - 1)[0]);
  
        if (this.ListaMaterialesColumnas[2]) {
  
          if  (JSON.stringify(this.ListaMaterialesColumnas).includes( JSON.stringify(terceraList).slice(1, -1) )) {
          }else{
            this.ListaMaterialesColumnas[2].push(terceraList[0])
          }
          
        }else{
          this.ListaMaterialesColumnas[2] = terceraList;
        }
      }
  
      if ( valor == 0 ) {
  
        cuartaList.push(this.MaterialSalida.slice(index - 1)[0]);
        
        if (this.ListaMaterialesColumnas[3]) {
  
          if  (JSON.stringify(this.ListaMaterialesColumnas).includes( JSON.stringify(cuartaList).slice(1, -1) )) {
          }else{
            this.ListaMaterialesColumnas[3].push(cuartaList[0])
          }
  
        }else{
          this.ListaMaterialesColumnas[3] = cuartaList;
        }
  
      }
      
      n = n - 1;
      
    }

  }

  // It activates the component of material salida editar for edit
  editarMaterialSalida(MaterialSalida: any, ListaMaterialesColumnas: any, MaterialSalidaNumero: any, MaterialSalidaNumero2: any){

    if (this._corridaService.AceptarMaterialSalida == true) {
      this._materialService.MaterialSalida = MaterialSalida;
      this._materialService.MaterialSalidaP = MaterialSalidaNumero;
      this._materialService.MaterialSalidaS = MaterialSalidaNumero2;
      this._materialService.MaterialesSalida = ListaMaterialesColumnas;
      var cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>
      cortina[0].style.visibility = 'visible';
  
      this.cambioEditarMaterialSalida.emit(true);  
    }

  }

  // It activates the component of material salida ver for show the data
  verMaterialSalida(MaterialSalida: any){
    this._materialService.MaterialSalidaVer[2] = MaterialSalida;
    this._materialService.MaterialSalidaPermisoVer
    this._materialService.MaterialSalidaPermisoVer = true;
    this.cambioVerMaterialSalida.emit(true);
    var cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>
    cortina[0].style.visibility = 'visible';  
  }

}
