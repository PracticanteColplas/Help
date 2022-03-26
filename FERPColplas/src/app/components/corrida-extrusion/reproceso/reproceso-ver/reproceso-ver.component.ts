import { Component, OnChanges, Input, ElementRef, Output, EventEmitter, HostListener} from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';

import { ToastrService } from 'ngx-toastr';

import { ReprocesoService } from 'src/app/services/reproceso.service';
import { OrdenProduccionService } from 'src/app/services/orden-produccion.service';

@Component({
  selector: 'app-reproceso-ver',
  templateUrl: './reproceso-ver.component.html',
  styleUrls: ['./reproceso-ver.component.css']
})
export class ReprocesoVerComponent implements OnChanges {

  constructor(
    private toastr: ToastrService,
    public _reprocesoService: ReprocesoService,
    public _ordenProduccionService: OrdenProduccionService,
    private eRef: ElementRef,
  ) { 
  }

  @Output() cambio = new EventEmitter();
  @Input() reprocesoVer: any;
  InformacionReprocesoVer : any[] = [
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

  ngOnChanges(): void {
    this.cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>
    this.OrganizarInformacionReprocesoVer(this.reprocesoVer);  
  }

  // This function allows to arrange the data 
  OrganizarInformacionReprocesoVer(reprocesoVer: any){
    if (this.reprocesoVer) {

      if (this._ordenProduccionService.corridaSinFinalizarEx) {

        try {
          this.InformacionReprocesoVer.push(this._reprocesoService.ReprocesoVer[1][0][0][0].codigoProductoERP)
          this.InformacionReprocesoVer.push(this._reprocesoService.ReprocesoVer[1][0][0][0].pk_OrdenProduccion)
          this.InformacionReprocesoVer.push(this._reprocesoService.ReprocesoVer[1][0][0][0].cliente)
          this.InformacionReprocesoVer.push(this._reprocesoService.ReprocesoVer[0][0].nombre)

          this.InformacionReprocesoVer.push(this._reprocesoService.ReprocesoVer[2].noLote)
          this.InformacionReprocesoVer.push(this._reprocesoService.ReprocesoVer[2].pesoNetoRollo)
          this.InformacionReprocesoVer.push(this._reprocesoService.ReprocesoVer[1][0][0][0].descripcion)
          this.InformacionReprocesoVer.push(this._reprocesoService.ReprocesoVer[2].ubicacionTipo)
          this.InformacionReprocesoVer.push(this._reprocesoService.ReprocesoVer[2].ubicacionNumero)
      
        } catch (error) {
          
        }


        try {

          this.InformacionReprocesoVer.push(this._reprocesoService.ReprocesoVer[0][0][0][0].codigoProductoERP)
          this.InformacionReprocesoVer.push(this._reprocesoService.ReprocesoVer[0][0][0][0].pk_OrdenProduccion)
          this.InformacionReprocesoVer.push(this._reprocesoService.ReprocesoVer[0][0][0][0].cliente)
          this.InformacionReprocesoVer.push(this._reprocesoService.ReprocesoVer[1][0].nombre)

          this.InformacionReprocesoVer.push(this._reprocesoService.ReprocesoVer[2].noLote)
          this.InformacionReprocesoVer.push(this._reprocesoService.ReprocesoVer[2].pesoNetoRollo)
          this.InformacionReprocesoVer.push(this._reprocesoService.ReprocesoVer[0][0][0][0].descripcion)
          this.InformacionReprocesoVer.push(this._reprocesoService.ReprocesoVer[2].ubicacionTipo)
          this.InformacionReprocesoVer.push(this._reprocesoService.ReprocesoVer[2].ubicacionNumero)
        } catch (error) {
          
        }
      }else{
        try {
          this.InformacionReprocesoVer.push(this._reprocesoService.ReprocesoVer[0][0].codigoProductoERP)
          this.InformacionReprocesoVer.push(this._reprocesoService.ReprocesoVer[0][0].pk_OrdenProduccion)
          this.InformacionReprocesoVer.push(this._reprocesoService.ReprocesoVer[0][0].cliente)
          this.InformacionReprocesoVer.push(this._reprocesoService.ReprocesoVer[1][0].nombre)
          this.InformacionReprocesoVer.push(this._reprocesoService.ReprocesoVer[2].noLote)
          this.InformacionReprocesoVer.push(this._reprocesoService.ReprocesoVer[2].pesoNetoRollo)
          this.InformacionReprocesoVer.push(this._reprocesoService.ReprocesoVer[0][0].descripcion)
          this.InformacionReprocesoVer.push(this._reprocesoService.ReprocesoVer[2].ubicacionTipo)
          this.InformacionReprocesoVer.push(this._reprocesoService.ReprocesoVer[2].ubicacionNumero)
      
        } catch (error) {
          
        }

        
      }
      
      
    }

    // Here is sending
    this.transformarQR(this.InformacionReprocesoVer);    
  }

  // This function turn the data in QR's code
  transformarQR(InformacionReprocesoVer: any){
    var elemento = '';

    elemento = 
      InformacionReprocesoVer[0] +"\\"+
      InformacionReprocesoVer[7] +"\\"+
      InformacionReprocesoVer[1] +"\\"+
      InformacionReprocesoVer[2] +"\\"+
      InformacionReprocesoVer[6] +"\\"+
      InformacionReprocesoVer[3] +"\\"+
      InformacionReprocesoVer[4] +"\\"+
      InformacionReprocesoVer[5] +"\\"+
      InformacionReprocesoVer[8] +"\\"
    ;

    if (elemento) {
      this.qrdata = elemento  
    }
  }

  // This function disable the component of reproceso ver, i mean this component
  cancelarReprocesoVer(){
    this.cambio.emit(false);
    this.cortina[0].style.visibility = 'hidden';
  }

}