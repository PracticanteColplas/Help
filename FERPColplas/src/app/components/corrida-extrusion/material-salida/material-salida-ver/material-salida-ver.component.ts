import { style } from '@angular/animations';
import { Component, OnChanges, ElementRef, Input, Output, EventEmitter, HostListener} from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { MaterialService } from 'src/app/services/material.service';
import { OrdenProduccionService } from 'src/app/services/orden-produccion.service';



@Component({
  selector: 'app-material-salida-ver',
  templateUrl: './material-salida-ver.component.html',
  styleUrls: ['./material-salida-ver.component.css']
})
export class MaterialSalidaVerComponent implements OnChanges {

  constructor(
    private toastr: ToastrService,
    private _materialService: MaterialService,
    private _ordenProduccionService: OrdenProduccionService,
    private eRef: ElementRef,
  ) { 
  }

  @Output() cambio = new EventEmitter();
  @Input() materialSalidaVer: any;
  InformacionMaterialSalidaVer : any[] = [
  ];
  qrdata : string = '';

  isFocusInsideComponent = false;
  isComponentClicked = false;
  contador: any = 0;
  cortina: any;

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

  private style: HTMLStyleElement;

  ngOnChanges(): void {
    this.cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>
    this.OrganizarInformacionMaterialSalidaVer(this.materialSalidaVer);  
  }

  printer() {
    this.style.innerText = '@media print { body * { visibility: hidden; } .print-section, .print-section * { visibility: visible; } .print-section { width: 100%; } }';
    const printContent = document.getElementById("IfoCorrida");
    const WindowPrt = window!.open('', '', 'left=0,top=50,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt!.document.write(printContent!.innerHTML);
    WindowPrt!.document.close();
    WindowPrt!.focus();
    WindowPrt!.print();
    WindowPrt!.close();
  }

  // This function arrange the data that will be send to the view component of material salida ver
  OrganizarInformacionMaterialSalidaVer(materialSalidaVer: any){
    
    if (this.materialSalidaVer) {


      if (this._ordenProduccionService.corridaSinFinalizarEx) {

        try {
          this.InformacionMaterialSalidaVer.push(this._materialService.MaterialSalidaVer[1][0][0][0].codigoProductoERP)
          this.InformacionMaterialSalidaVer.push(this._materialService.MaterialSalidaVer[1][0][0][0].pk_OrdenProduccion)
          this.InformacionMaterialSalidaVer.push(this._materialService.MaterialSalidaVer[1][0][0][0].cliente)
  
          this.InformacionMaterialSalidaVer.push(this._materialService.MaterialSalidaVer[0][0].nombre)
          this.InformacionMaterialSalidaVer.push(this._materialService.MaterialSalidaVer[2].noLote)
          this.InformacionMaterialSalidaVer.push(this._materialService.MaterialSalidaVer[2].pesoNetoRollo)
          this.InformacionMaterialSalidaVer.push(this._materialService.MaterialSalidaVer[1][0][0][0].descripcion)
          this.InformacionMaterialSalidaVer.push()
          this.InformacionMaterialSalidaVer.push(this._materialService.MaterialSalidaVer[2].ubicacionNumero)    
        } catch (error) {
          
        }

        try {
          this.InformacionMaterialSalidaVer.push(this._materialService.MaterialSalidaVer[0][0][0][0].codigoProductoERP)
          this.InformacionMaterialSalidaVer.push(this._materialService.MaterialSalidaVer[0][0][0][0].pk_OrdenProduccion)
          this.InformacionMaterialSalidaVer.push(this._materialService.MaterialSalidaVer[0][0][0][0].cliente)
  
          this.InformacionMaterialSalidaVer.push(this._materialService.MaterialSalidaVer[1][0].nombre)
          this.InformacionMaterialSalidaVer.push(this._materialService.MaterialSalidaVer[2].noLote)
          this.InformacionMaterialSalidaVer.push(this._materialService.MaterialSalidaVer[2].pesoNetoRollo)
          this.InformacionMaterialSalidaVer.push(this._materialService.MaterialSalidaVer[0][0][0][0].descripcion)
          this.InformacionMaterialSalidaVer.push()
          this.InformacionMaterialSalidaVer.push(this._materialService.MaterialSalidaVer[2].ubicacionNumero)    
        } catch (error) {
          
        }
        

      }else{

        this.InformacionMaterialSalidaVer.push(this._materialService.MaterialSalidaVer[0][0][0][0].codigoProductoERP)
        this.InformacionMaterialSalidaVer.push(this._materialService.MaterialSalidaVer[0][0][0][0].pk_OrdenProduccion)
        this.InformacionMaterialSalidaVer.push(this._materialService.MaterialSalidaVer[0][0][0][0].cliente)
        this.InformacionMaterialSalidaVer.push(this._materialService.MaterialSalidaVer[1][0].nombre)
        this.InformacionMaterialSalidaVer.push(this._materialService.MaterialSalidaVer[2].noLote)
        this.InformacionMaterialSalidaVer.push(this._materialService.MaterialSalidaVer[2].pesoNetoRollo)
        this.InformacionMaterialSalidaVer.push(this._materialService.MaterialSalidaVer[0][0][0][0].descripcion)
        this.InformacionMaterialSalidaVer.push()
        this.InformacionMaterialSalidaVer.push(this._materialService.MaterialSalidaVer[2].ubicacionNumero)  
       
      }
      

    }


    this.transformarQR(this.InformacionMaterialSalidaVer);
    
  }

  // This function turns the data in one QR code
  transformarQR(InformacionMaterialSalidaVer: any){
    var elemento = '';

    elemento = 
      InformacionMaterialSalidaVer[0] +"\\"+
      InformacionMaterialSalidaVer[1] +"\\"+
      InformacionMaterialSalidaVer[2] +"\\"+
      InformacionMaterialSalidaVer[6] +"\\"+
      InformacionMaterialSalidaVer[3] +"\\"+
      InformacionMaterialSalidaVer[4] +"\\"+
      InformacionMaterialSalidaVer[5] +"\\"+
      InformacionMaterialSalidaVer[7] +"\\"
    ;

    if (elemento) {
      this.qrdata = elemento  
    }
  }

  // This function allow to disable the component of material salida ver
  cancelarMaterialSalidaVer(){
    this.cambio.emit(false);
    this.cortina[0].style.visibility = 'hidden';
  }

}
