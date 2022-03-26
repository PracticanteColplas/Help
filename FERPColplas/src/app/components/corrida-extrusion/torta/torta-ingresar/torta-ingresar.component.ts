import { Component, OnInit, Input, ElementRef, HostListener, EventEmitter, Output, OnChanges} from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

import { CorridaService } from 'src/app/services/corrida.service';
import { TortaService } from 'src/app/services/torta.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-torta-ingresar',
  templateUrl: './torta-ingresar.component.html',
  styleUrls: ['./torta-ingresar.component.css']
})
export class TortaIngresarComponent implements OnInit {

  form: FormGroup;
  pitanjeForm: FormGroup;

  @Output() cambio = new EventEmitter();
  @Input() TortaExtrusionPermiso: any;

  isFocusInsideComponent = false;
  isComponentClicked = false;
  contador: any = 0;
  ListaTortasColumnas : any[] = [
  ];

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
    public _tortaService: TortaService,
    private eRef: ElementRef,
    private toastr: ToastrService,
  ) { 
    
  }

  Torta : any[] = [
  ];
  TortaPk : any[] = [
  ];
  TortaPkUtilizar : any[] = [
  ];
  entrada : any[] = [
  ];
  datos: any;
  CorridasExtrusion : any[] = [
  ];
  checkSeleccionado : any[] = [
  ];
  activarBoton : boolean = true;
  cortina: any;
  
  ngOnInit(): void {
    this._tortaService.getTortaExtrusion().subscribe(data => {
      this.Torta = data.message;

      this.organizarDataMostrar(this.Torta);

      this.cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>

      for (const key in this.Torta) {
        this.TortaPkUtilizar.push(this.Torta[key].pk_Torta)
      }

      this.form = this.fb.group({
      }) 
      for (let index = 0; index < this.TortaPkUtilizar.length; index++) {
        this.form.addControl(this.TortaPkUtilizar[index], new FormControl('', []));
      }
      
      this.form.reset();
    }, error => {
      console.log(error);
    })
  }

  onChange(tortaExtrusionPk:number, event: Event ) {

    if (this.TortaPk.indexOf(tortaExtrusionPk) == -1) {
      this.TortaPk.push(tortaExtrusionPk) 
      
    }else{
      this.TortaPk.splice(this.TortaPk.indexOf(tortaExtrusionPk), 1) 
    }

    if (this.TortaPk.length > 0) {
      this.activarBoton = false;
    }

    if (this.TortaPk.length == 0) {
      this.activarBoton = true;
    }

    this.checkSeleccionado[0] = event;

    if (this.checkSeleccionado[0].target.checked) {
      this.form.controls[tortaExtrusionPk.toString()].setValidators([Validators.required]);
      this.form.controls[tortaExtrusionPk.toString()].enable();
    }else{
      this.form.controls[tortaExtrusionPk.toString()].setValidators([]);
      this.form.controls[tortaExtrusionPk.toString()].reset();
      this.form.controls[tortaExtrusionPk.toString()].disable();
    }
  }

  onChangeValor(item:number){

  }

  guardarTorta(){
    this.CorridasExtrusion = [];
    try {

      this.CorridasExtrusion.push(this._corridaService.DatosCorridaNoFinalizada)  
      this.CorridasExtrusion.push(this._corridaService.CorridaExtrusion)  
    } catch (error) {
      
    }

    for (let index = 0; index < this.TortaPk.length; index++) {

     
      const control = this.form.get(this.TortaPk[index].toString())?.value;
      const control1 = this.TortaPk[index];
      
      if (this._corridaService.CorridaExtrusion) {

        var pk: any;
        if (this._corridaService.CorridaNoFinalizadaActivar) {
          pk = this.CorridasExtrusion[0][2][0][0].pk_CorridaExtrusion
        }else{
          pk = this.CorridasExtrusion[1].pk_CorridaExtrusion
        }

        if (control != null) {
          this.datos = {
            Fk_Torta: control1,
            Fk_CorridaExtrusion: pk,
            Cantidad: control,
          }  
        }

        // That allows to save the data of one torta
        this._tortaService.saveTortaExtrusionCantidad(this.datos).subscribe(data => {

          this.toastr.success('El torta fue insertada con exito', 'Torta insertada');
          if (this._tortaService.TortaExtrusionActualizar) {
            this._tortaService.TortaExtrusionActualizar = false  
          }else{
            this._tortaService.TortaExtrusionActualizar = true  
          }

          this.form.reset();
        }, error => {
          console.log(error);
        })
      }
    }
  }

   // this function sorts the elements that will go to show 
   organizarDataMostrar(Torta: any){

    var primeraList : any[] = [
    ];
    var segundaList : any[] = [
    ];
    var terceraList : any[] = [
    ];
    var cuartaList : any[] = [
    ];

    for (var index = 1; index < this.Torta.length + 1; index++) {
      // it's with 2 'cause i will only show 2 columns
      var valor = parseFloat((index % 2 ).toFixed(1));

      if ( valor == 1 ) {
        primeraList.push(this.Torta.slice(index - 1)[0]);

        if (this.ListaTortasColumnas[0]) {
  
          if  (JSON.stringify(this.ListaTortasColumnas).includes( JSON.stringify(primeraList).slice(1, -1) ) ) {
          }else{
            this.ListaTortasColumnas[0].push(primeraList[0])
          }
          
        }else{
          this.ListaTortasColumnas[0] = primeraList;
        }
  
      }

      if ( valor == 0 ) {
  
        segundaList.push(this.Torta.slice(index - 1)[0]);
        if (this.ListaTortasColumnas[1]) {
  
          if  (JSON.stringify(this.ListaTortasColumnas).includes( JSON.stringify(segundaList).slice(1, -1) )) {
          }else{
            this.ListaTortasColumnas[1].push(segundaList[0])
          }
          
        }else{
          this.ListaTortasColumnas[1] = segundaList;
        }
      }
      
    }

  }

  // This function disable this component
  cancelarTortaIngresar(){
    this.cambio.emit(false);
    this.cortina[0].style.visibility = 'hidden';
  }

}
