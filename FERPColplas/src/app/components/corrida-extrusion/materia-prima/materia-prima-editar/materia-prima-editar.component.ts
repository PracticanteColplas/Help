import { Component, OnInit, Input, ElementRef, HostListener, EventEmitter, Output, OnChanges} from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

import { CorridaService } from 'src/app/services/corrida.service';
import { MPriExtrusionService } from 'src/app/services/mpri-extrusion.service';
import { ConsumoMPriExtrusionService } from 'src/app/services/consumo-mpri-extrusion.service';

import { DevolucionService } from 'src/app/services/devolucion.service';
import { MaterialService } from 'src/app/services/material.service';
import { RetalService } from 'src/app/services/retal.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-materia-prima-editar',
  templateUrl: './materia-prima-editar.component.html',
  styleUrls: ['./materia-prima-editar.component.css']
})
export class MateriaPrimaEditarComponent implements OnChanges {

  form: FormGroup;
  pitanjeForm: FormGroup;

  @Output() cambio = new EventEmitter();
  @Input() MPriExtrusionActualizar: any;
  ActivarBoton!: boolean | false ;

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
      this.cambio.emit(false);
      (<HTMLInputElement>document.querySelector(".relative-materia-prima-mostrar")).style.visibility = 'visible';

      this.isComponentClicked = false;
      this.isFocusInsideComponent = false;
    }
  }


  constructor(
    private fb: FormBuilder,    
    public _corridaService: CorridaService,
    public _mPriExtrusionService: MPriExtrusionService,
    public _consumoMPriExtrusionService: ConsumoMPriExtrusionService,
    private _retalService: RetalService,
    private _devolucionService: DevolucionService,
    private _materialService: MaterialService,
    private toastr: ToastrService,
    private eRef: ElementRef,
  ) { 
    this.form = this.fb.group({
      cantidad: ['', [Validators.required]], 
    }) 
  }



  activarBoton : boolean = true;
  
  ngOnChanges(): void {

    if (this.MPriExtrusionActualizar.pk_ConsumoMPriExtrusion) {
      // enables or disables the buttom
      this.ActivarBoton = true
    }else{
      this.ActivarBoton = false
    }
  }

  editarConsumoMPriExtrusion(){

    const entrada: any = {
      cantidadConsumida: this.form.get('cantidad')?.value,
    }

    var valor = this.MPriExtrusionActualizar.cantidadConsumida;

    this.MPriExtrusionActualizar.cantidadConsumida = entrada.cantidadConsumida;

    this._consumoMPriExtrusionService.updateMPriExtrusionCantidad(this.MPriExtrusionActualizar.pk_ConsumoMPriExtrusion, this.MPriExtrusionActualizar).subscribe(data => {

      this.toastr.success('La materia prima ha sido actualizada correctamente', 'Materia prima actualizada');

      this._consumoMPriExtrusionService.MPriExtrusionTotalIngresada[this._consumoMPriExtrusionService.MPriExtrusionCambioB][this._consumoMPriExtrusionService.MPriExtrusionCambioJ].cantidadConsumida = entrada.cantidadConsumida;

      // Changes the value of MPriExtrusionCantidad for the view
      this._consumoMPriExtrusionService.MPriExtrusionCantidadTotal[this.MPriExtrusionActualizar.fk_MPri] = this._consumoMPriExtrusionService.MPriExtrusionCantidadTotal[this.MPriExtrusionActualizar.fk_MPri] + this.MPriExtrusionActualizar.cantidadConsumida - valor;

      this._consumoMPriExtrusionService.MPriExtrusionTotal = this._consumoMPriExtrusionService.MPriExtrusionTotal - valor + this.MPriExtrusionActualizar.cantidadConsumida;

      

      if (this._devolucionService.DevolucionActualizar) {
        this._devolucionService.DevolucionActualizar = false  
      }else{
        this._devolucionService.DevolucionActualizar = true  
      }

      if (this._materialService.MaterialSalidaActualizar) {
        this._materialService.MaterialSalidaActualizar = false  
      }else{
        this._materialService.MaterialSalidaActualizar = true  
      }

      if (this._retalService.RetalExtrusionActualizar) {
        this._retalService.RetalExtrusionActualizar = false  
      }else{
        this._retalService.RetalExtrusionActualizar = true  
      }
      
      this.form.reset();
    }, error => {
      console.log(error);
    })

    if (this._consumoMPriExtrusionService.ConsumoMPriActualizar) {
      this._consumoMPriExtrusionService.ConsumoMPriActualizar = false;
    }else{
      this._consumoMPriExtrusionService.ConsumoMPriActualizar = true;
    }
  }

  // Cancel the component of the materia prima editar
  cancelarMPriIngresar(){
    this.cambio.emit(false);
    (<HTMLInputElement>document.querySelector(".relative-materia-prima-mostrar")).style.visibility = 'visible';  
  }

}
