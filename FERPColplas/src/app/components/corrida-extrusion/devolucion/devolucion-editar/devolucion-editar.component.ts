import { Component, OnInit, Input, ElementRef, HostListener, EventEmitter, Output, OnChanges} from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

import { CorridaService } from 'src/app/services/corrida.service';
import { MPriExtrusionService } from 'src/app/services/mpri-extrusion.service';
import { ConsumoMPriExtrusionService } from 'src/app/services/consumo-mpri-extrusion.service';
import { DevolucionService } from 'src/app/services/devolucion.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-devolucion-editar',
  templateUrl: './devolucion-editar.component.html',
  styleUrls: ['./devolucion-editar.component.css']
})
export class DevolucionEditarComponent implements OnChanges {

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
      this.cambio.emit(false)
      this.isComponentClicked = false;
      this.isFocusInsideComponent = false;

      this.cortina[0].style.visibility = 'hidden';
    }
  }


  constructor(
    private fb: FormBuilder,    
    public _corridaService: CorridaService,
    public _mPriExtrusionService: MPriExtrusionService,
    public _consumoMPriExtrusionService: ConsumoMPriExtrusionService,
    public _devolucionService: DevolucionService,
    private eRef: ElementRef,
    private toastr: ToastrService,
  ) { 
    this.form = this.fb.group({
      cantidad: ['', [Validators.required]], 
    }) 
  }

  MPri : any[] = [
  ];
  MPriPkUtilizar : any[] = [
  ];
  entrada : any[] = [
  ];
  descripcionPk : any[] = [
  ];
  CorridasExtrusion : any[] = [
  ];
  activarBoton : boolean = true;
  cortina: any;
  
  ngOnChanges(): void {
    this.cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>
    if (this.MPriExtrusionActualizar.pk_ConsumoMPriExtrusion) {
      // Changes the values for enable the button
      this.ActivarBoton = true
    }else{
      this.ActivarBoton = false
    }
  }

  editarDevolucionExtrusion(){
  }


  // This function disable the MPriExtrusion ingresar
  cancelarMPriIngresar(){
    this.cambio.emit(false);
    this.cortina[0].style.visibility = 'hidden';
  }

}
