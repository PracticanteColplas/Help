import { Component, OnInit, ElementRef, HostListener, Output, EventEmitter, OnChanges, Input } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { ToastrService } from 'ngx-toastr';

import { CorridaService } from 'src/app/services/corrida.service';
import { OrdenProduccionService } from 'src/app/services/orden-produccion.service';
import { OperarioService } from 'src/app/services/operario.service';
import { DevolucionService } from 'src/app/services/devolucion.service';
import { BuscarOrdenProduccionService } from 'src/app/services/buscar-orden-produccion.service';
import { MaterialService } from 'src/app/services/material.service';
import { ExcelService } from 'src/app/excel.service';

import * as $ from "jquery";

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-buscar-orden-produccion',
  templateUrl: './buscar-orden-produccion.component.html',
  styleUrls: ['./buscar-orden-produccion.component.css']
})
export class BuscarOrdenProduccionComponent {

  @Output() cambio = new EventEmitter();
  @Output() activarFinalizarCorrida = new EventEmitter();
  @Output() maquina = new EventEmitter();

  @Input() OperarioCorridaExtrusionInicio: any;

  isFocusInsideComponent = false;
  isComponentClicked = false;
  public boton : any = true;
  contador: any = 0;
  cortina: any;
  ordenesProduccion: any = [];
  ordenesProduccion2: any = [];
  rollos: any = [];
  AceptarbuscarOrdenProduccionService: any = false;

  p = 1;
  pageSize = 10; 
  page = 4;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.contador == 0 || this.eRef.nativeElement.contains(event.target) ) {
      this.contador += 1;
      this.isComponentClicked = true;
      this.isFocusInsideComponent = true;
    } else {
      this.contador += 1;
      this.cambio.emit(false);
      this.isComponentClicked = false;
      this.isFocusInsideComponent = false;
    }
  }

  ngOnInit(): void {
    this._ordenProduccionService.getOrdenesProduccion().subscribe(data => {
      this.ordenesProduccion = data;
      this.ordenesProduccion2 = data;
      this.form.reset();
    }, error => {
      console.log(error);
    })
  }

  ngOnChanges(): void {
    this.cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>

    this.boton = this._corridaService.boton;

    if (this._corridaService.OperarioCorridaExtrusionInicio.length == undefined) {
      this.boton == true;
    }


    this.proceso = this.route.snapshot.paramMap.get('proceso');
  }

  onPageChange(e)
  {
    if (e){
      this.p = e;
    }
      
  }
  paginaSiguiente(){

    var limite: any = 0;


    var valorRestar = this.ordenesProduccion.length % this.pageSize;


    if (valorRestar != 0) {
      var nuevoValor = this.ordenesProduccion.length - valorRestar  
      limite = (nuevoValor / 7) + 1;
    }else{
      limite =  this.ordenesProduccion.length / this.pageSize;
    }    

    if (this.p < limite) {
      this.p += 1;  
    }
    
  }
  paginaAnterior(){
    if (this.p > 1) {
      this.p -= 1;  
    }
    
  }

  listMaquinasCorridaExtrusion : any[] = [
    { nombre: 'CMG1', value: 'CMG1' },
    { nombre: 'CMG2', value: 'CMG2' },
    { nombre: 'CAST', value: 'CAST' },
  ];
  listOrdenProduccion : any[] = [
  ];
  listVOrdenProduccion : any[] = [
  ];
  listOperario : any[] = [
  ];


  form: FormGroup;
  public ordenProduccion: any;
  proceso!: string | null;
  valoresEntrada!: any | null;
  valor: string = "";


  constructor(

    private fb: FormBuilder,
    private _operarioService: OperarioService,
    private _ordenProduccionService: OrdenProduccionService,
    private _corridaService: CorridaService,
    private _devolucionService: DevolucionService,
    public _buscarOrdenProduccionService: BuscarOrdenProduccionService,
    public _materialService: MaterialService,
    private route : ActivatedRoute,
    private toastr: ToastrService,
    private eRef: ElementRef,
    private excelService: ExcelService

    ) {

    this.form = this.fb.group({
      fechaInicial: ['', [Validators.required]],
      operarioIncial: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(1)]],
      tiempoAjuste: ['', [Validators.required]],
      maquina: ['', [Validators.required]],})
  }

  filterPost = '';

  inputValue = "";
  tags: string[] = [];

  onInput(value: Event) {
    this.p = 1
    var nuevoValor = (<HTMLInputElement>value.target).value;

    var nuevoArray:any = [];
    for (let index = 0; index < this.ordenesProduccion2.length; index++) {
      if (
        (this.ordenesProduccion2[index]["pk_OrdenProduccion"].indexOf(nuevoValor) != -1)|| 
        (this.ordenesProduccion2[index]["codigoProductoERP"].indexOf(nuevoValor) != -1) 
        ) {
        nuevoArray.push(this.ordenesProduccion2[index])
      }     
     
    }

    this.ordenesProduccion = nuevoArray;

  }

  title = 'angular-app';
  fileName= 'ExcelSheet.xlsx';
  // It activates the component of material salida editar for edit
  descargarOrdenProduccion(OrdenProduccionID: any){

    this._buscarOrdenProduccionService.AceptarbuscarOrdenProduccionService = true;
    this._buscarOrdenProduccionService.OrdenProduccionID = OrdenProduccionID;

    this.AceptarbuscarOrdenProduccionService = true;
    this.iniciarVerMaterialSalida = true;
    this._buscarOrdenProduccionService.DescargarOrdenProduccionData = true;


   
  }

  obtenerFechaActual(dateDay2){
    var formatoFecha: string = '';
    const formatoMap = {
      dd: dateDay2.getDate(),
      mm: dateDay2.getMonth() + 1,
      yyyy: dateDay2.getFullYear(),
      hh: dateDay2.getHours(),
      mn: dateDay2.getMinutes(),
      ss: dateDay2.getSeconds(),
      sss: dateDay2.getMilliseconds(),
    };

    // console.log(dateDay2.getMilliseconds());
    
    formatoFecha += formatoMap.yyyy;

    if (formatoMap.mm < 10) {
      formatoFecha += '-0' +formatoMap.mm;
    } else {
      formatoFecha += '-' +formatoMap.mm;
    }
    if (formatoMap.dd < 10) {
      
      // var nuevoDia = formatoMap.dd - 30;
      // if (nuevoDia < 1) {
      //   formatoFecha = "";
      //   formatoFecha += formatoMap.yyyy;
      //   if (formatoMap.mm < 10) {
      //     var nuevoMes = formatoMap.mm - 1;
      //     formatoFecha += '-0' +nuevoMes;
      //     formatoFecha += '-' +3nuevoDia;    
      //   } else {
      //     formatoFecha += '-' +formatoMap.mm;
      //   }  


      // }

      

      // formatoFecha += '-0' +nuevoDia;
    } else {
      formatoFecha += '-' +formatoMap.dd;
    }
    if (formatoMap.hh < 10) {
      formatoFecha += 'T0' +formatoMap.hh;
    } else {
      formatoFecha += 'T' +formatoMap.hh;
    }
    if (formatoMap.mn < 10) {
      formatoFecha += ':0' +formatoMap.mn;
    } else {
      formatoFecha += ':' +formatoMap.mn;
    }
    if (formatoMap.ss < 10) {
      formatoFecha += ':0' +formatoMap.ss;
    } else {
      formatoFecha += ':' +formatoMap.ss;
    }
    if (formatoMap.sss < 10) {
      formatoFecha += '.00' +formatoMap.sss;
    } else {
      if (formatoMap.sss < 100) {
        formatoFecha += '.0' +formatoMap.sss;
      }else{
        formatoFecha += '.' +formatoMap.sss;
      }
      
    }

    return formatoFecha;
  }

  descargarHistoricoRollos(){

    var dateDay1 = Date.now();
    // var dateDay4 = Date.now();
    var dateDay2 = new Date(dateDay1);
    var dateDay3 = new Date('Jul 12 2011');

    console.log(dateDay3);
    console.log(dateDay1);
    


    // var fecha = new Date("Jul 1 2011");
    // console.log(fecha)
    var dias = 30; // Número de días a agregar
    dateDay2.setDate(dateDay2.getDate() - dias);
    // console.log(fecha.getDate());
    console.log(dateDay2)
    // console.log(dateDay4);
    

    var datos = this.obtenerFechaActual(dateDay2);

    // console.log(datos);
    

    this._materialService.getRollosUltimosDias(datos).subscribe(data => {
      // var title = 'angular-app';
      // var fileName= 'ExcelSheet.xlsx';
      console.log(data[0]);

      var nuevoArray = [];

      for (const key1 in data[0]) {
        var nuevoArray2 = [];
        for (const key2 in data[0][key1]) {
          // console.log(data[0][key1][key2]);

          if (key2 != "pk_MaterialSalida") {
            nuevoArray2.push(data[0][key1][key2])  
          }
          
          
        }  
        nuevoArray.push(nuevoArray2);
      }
      
      
      console.log(nuevoArray);
      const header = ["Corrida", "Cantida", "Nuero Lote", "Ubicacion", "Fecha"]

      this.excelService.generateExcel(nuevoArray, header);

   

  

      // /* pass here the table id */
      // let element = document.getElementById('informacion-corridas table-bordered');
      // const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

      // let element2 = document.getElementById('tabla-total-resumen-orden table table-bordered');
      // const ws2: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element2);

      // let element3 = document.getElementById('tabla-consecutivo-peso table table-bordered');
      // const ws3: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element3);
  
      // /* generate workbook and add the worksheet */
      // const wb: XLSX.WorkBook = XLSX.utils.book_new();

      // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      // XLSX.utils.book_append_sheet(wb, ws2, 'Sheet2');
      // XLSX.utils.book_append_sheet(wb, ws3, 'Sheet3');
  
      // /* save to file */  
      // XLSX.writeFile(wb, this.fileName);
  
      // let element1 = data;
      // try {
      //   const ws1: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element1);
      //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
        
      //   XLSX.utils.book_append_sheet(wb, ws1, 'Sheet1');
      //   XLSX.writeFile(wb, fileName);
      // } catch (error) {
        
      // }

      this.rollos = data;
      console.log("Hola mundo");

      console.log(data);
    }, error => {
      console.log(error);
    })
    


    this.funcionConRetraso();
    
    
  }

  funcionConRetraso() {
    // var title = 'angular-app';
    // var fileName= 'ExcelSheet.xlsx';
    // // var ejem 

    // let element1 = '';
    // // try {
    // //   const ws1: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element1);
    // //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
      
    // //   XLSX.utils.book_append_sheet(wb, ws1, 'Sheet1');
    // //   XLSX.writeFile(wb, fileName);
    // // } catch (error) {
      
    // // }

    // let element = '';
    // const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    // /* generate workbook and add the worksheet */
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();

    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

 
    // /* save to file */  
    // XLSX.writeFile(wb, this.fileName);
    
  }


  // It activates the component of material salida ver for show the data
  verOrdenProduccion(OrdenProduccionID: any){
    this._buscarOrdenProduccionService.AceptarbuscarOrdenProduccionService = true;
    this._buscarOrdenProduccionService.OrdenProduccionID = OrdenProduccionID;

    this.AceptarbuscarOrdenProduccionService = true;

    var cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>
    cortina[0].style.visibility = 'visible';

    this.iniciarVerMaterialSalida = true

    this._buscarOrdenProduccionService.DescargarOrdenProduccionData = false;
  }

  iniciarVerMaterialSalida!: boolean | false;
  materialSalidaVerMostrar_(entrada: any){
    if (entrada == false) {
      this.iniciarVerMaterialSalida = entrada  
    }
  }
}
