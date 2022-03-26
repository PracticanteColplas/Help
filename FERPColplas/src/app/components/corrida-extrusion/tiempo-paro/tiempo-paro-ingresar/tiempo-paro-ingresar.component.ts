import { Component, OnInit, Input, ElementRef, HostListener, EventEmitter, Output, OnChanges} from '@angular/core';

import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { CorridaService } from 'src/app/services/corrida.service';
import { TiempoParoService } from 'src/app/services/tiempo-paro.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-tiempo-paro-ingresar',
  templateUrl: './tiempo-paro-ingresar.component.html',
  styleUrls: ['./tiempo-paro-ingresar.component.css']
})
export class TiempoParoIngresarComponent implements OnChanges {

  form: FormGroup;
  @Input() TiempoParoPermiso: any;
  CorridasExtrusion : any[] = [
  ];



  @Output() cambio = new EventEmitter();

  isFocusInsideComponent = false;
  isComponentClicked = false;
  contador: any = 0;
  cortina: any;
  DatosOperarioCorridaInicio: any;

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
    private _corridaService: CorridaService,
    private _tiempoParoService: TiempoParoService,
    private eRef: ElementRef,
    private toastr: ToastrService,
    ) 
  { 
    this.form = this.fb.group({
      FechaInicio: ['', [Validators.required]], 
      FechaFinal: ['', [Validators.required]], 
      CausaDescripcion: ['', [Validators.required]], 
    }) 
  }

  ngOnChanges(): void { 
    this.cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>
    try {
      this.CorridasExtrusion.push(this._corridaService.DatosCorridaNoFinalizada)  
      this.CorridasExtrusion.push(this._corridaService.CorridaExtrusion)  
      
    } catch (error) {
      
    }

    this.DatosOperarioCorridaInicio = this._corridaService.DatosOperarioCorridaInicio;
    // Blocks the datetime for avoid the illogical data in bd
    var search_date = <HTMLFormElement> document.getElementById("FechaInicio");
    var search_date2 = <HTMLFormElement> document.getElementById("FechaFinal");
    try {
      if (this.DatosOperarioCorridaInicio.fechaHora == undefined) {
        search_date.min = this.DatosOperarioCorridaInicio;    
        search_date2.min = this.DatosOperarioCorridaInicio;    
      }else{
        search_date.min = this.DatosOperarioCorridaInicio.fechaHora;    
        search_date2.min = this.DatosOperarioCorridaInicio.fechaHora;    
      }
      
    } catch (error) {
      
    }
  }

  // It save the Tiempo paro
  guardarTiempoParo(){
    var pk: any;
    if (this._corridaService.CorridaNoFinalizadaActivar) {
      pk = this.CorridasExtrusion[0][2][0][0].pk_CorridaExtrusion
    }else{
      pk = this.CorridasExtrusion[1].pk_CorridaExtrusion
    }
    const entrada: any = {
      fk_CorridaExtrusion: pk,
      fechaInicio: this.form.get('FechaInicio')?.value,
      fechaFinal: this.form.get('FechaFinal')?.value,
      causaDescripcion: this.form.get('CausaDescripcion')?.value,
    }

    var timeInicio = new Date(entrada.fechaInicio).getTime();
    var timeInicioCorrida = new Date(this.DatosOperarioCorridaInicio.fechaHora).getTime();
    var timeFinal = new Date(entrada.fechaFinal).getTime();

    if ( (timeInicio > timeFinal) || (timeInicio < timeInicioCorrida) ) {
      this.toastr.error('Ha ocurrido un error, la corrida no pudo ser finalizada la fecha de finalizacion es menor que la de entrada','Error');
    }else{
      this.InsertarTiempoParo(entrada)
    }

  }

  // This function allows you to insert the Tiempo paro
  InsertarTiempoParo(entrada: any){
    this._tiempoParoService.saveTiempoParoExtrusion(entrada).subscribe(data => {
      this.toastr.success('El tiempo de paro fue registrado con exito', 'Tiempo de paro registrado');

      var fechaInicio = new Date(entrada.fechaInicio).getTime();
      var fechaFin = new Date(entrada.fechaFinal).getTime();

      var resta = fechaFin - fechaInicio;
      var horas = resta/(1000*60*60);

      this._tiempoParoService.TiempoParoTotal = this._tiempoParoService.TiempoParoTotal + horas
    
      if (this._tiempoParoService.TiempoParoActualizar) {
        this._tiempoParoService.TiempoParoActualizar = false  
      }else{
        this._tiempoParoService.TiempoParoActualizar = true  
      }
      
      this.form.reset();
    }, error => {
      this.toastr.error('El tiempo de paro no pudo ser registrado con exito', 'Tiempo de paro error');
      console.log(error);
    })
  }


  // This function allows you to limit the date
  limitarFecha(entrada: any){
    // Blocks the datetime for avoid the illogical data in bd
    var search_dateEntrada = <HTMLFormElement> document.getElementById("FechaInicio");
    var search_dateSalida = <HTMLFormElement> document.getElementById("FechaFinal");
    search_dateSalida.min = search_dateEntrada.value;
  }

  // This function cancel the component Tiempo paro ingresar
  cancelarTiempoParoIngresar(){
    this.cambio.emit(false);
    this.cortina[0].style.visibility = 'hidden';
  }

}
