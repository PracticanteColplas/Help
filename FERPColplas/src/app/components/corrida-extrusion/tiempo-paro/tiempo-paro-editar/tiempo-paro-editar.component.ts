import { Component, Input, OnChanges, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TiempoParoService } from 'src/app/services/tiempo-paro.service';
import { CorridaService } from 'src/app/services/corrida.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tiempo-paro-editar',
  templateUrl: './tiempo-paro-editar.component.html',
  styleUrls: ['./tiempo-paro-editar.component.css']
})
export class TiempoParoEditarComponent implements OnChanges {

  form: FormGroup;

  @Output() cambio = new EventEmitter();
  @Input() TiempoParoActualizar: any;
  ActivarBoton!: boolean | false ;


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
    private _tiempoParoService: TiempoParoService, 
    private _corridaService: CorridaService, 
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


    this.DatosOperarioCorridaInicio = this._corridaService.DatosOperarioCorridaInicio;
    // Blocks the datetime for avoid the illogical data in bd
    var search_date = <HTMLFormElement> document.getElementById("FechaInicio");
    search_date.min = this.DatosOperarioCorridaInicio.fechaHora;

    if (this.TiempoParoActualizar.pk_TiempoParoExtrusion) {
      // It changes the values for enable the buttom
      this.ActivarBoton = true
    }else{
      this.ActivarBoton = false
    }
  }

  // This function get the data in the component view for edit it and pass it to the function that changes the data
  editarMaterialSalida(){
    const entrada: any = {
      fechaInicio: this.form.get('FechaInicio')?.value,
      fechaFinal: this.form.get('FechaFinal')?.value,
      causaDescripcion: this.form.get('CausaDescripcion')?.value,
    }

    var timeInicio = new Date(entrada.fechaInicio).getTime();
    var timeFinal = new Date(entrada.fechaFinal).getTime();
    if (timeInicio > timeFinal) {
      this.toastr.error('Ha ocurrido un error, El tiempo de paro no puede ser actualizado ya que la hora de cierre es menor que la hora de entrada','Error');
    }else{
      this.InsertarTiempoParo(entrada)
    }
  }

  // This function of here allows you to update the data
  InsertarTiempoParo(entrada: any){
    var fechaInicio = this.TiempoParoActualizar.fechaInicio;
    var fechaFinal = this.TiempoParoActualizar.fechaFinal;

    this.TiempoParoActualizar.fechaInicio = entrada.fechaInicio
    this.TiempoParoActualizar.fechaFinal = entrada.fechaFinal
    this.TiempoParoActualizar.causaDescripcion = entrada.causaDescripcion

    this._tiempoParoService.updateTiempoParoExtrusion(this.TiempoParoActualizar.pk_TiempoParoExtrusion, this.TiempoParoActualizar).subscribe(data => {

      this.toastr.success('El tiempo de paro fue actualizado con exito', 'Tiempo de paro actualizado');

      var fechaInicioDespues = new Date(this.TiempoParoActualizar.fechaInicio).getTime();
      var fechaFinDespues  = new Date(this.TiempoParoActualizar.fechaFinal).getTime();

      var restaDespues = fechaFinDespues - fechaInicioDespues;
      var horasDespues = restaDespues/(1000*60*60);

      var fechaInicioAntes = new Date(fechaInicio).getTime();
      var fechaFinAntes = new Date(fechaFinal).getTime();

      var restaAntes = fechaFinAntes - fechaInicioAntes;
      var horasAntes = restaAntes/(1000*60*60);


      this._tiempoParoService.TiempoParoTotal = this._tiempoParoService.TiempoParoTotal + horasDespues - horasAntes;

      if (this._tiempoParoService.TiempoParoActualizar) {
        this._tiempoParoService.TiempoParoActualizar = false  
      }else{
        this._tiempoParoService.TiempoParoActualizar = true  
      }

      this.form.reset();
    }, error => {
      console.log(error);
    })
  }


  limitarFecha(entrada: any){
    // Blocks the datetime for avoid the illogical data in bd
    var search_dateEntrada = <HTMLFormElement> document.getElementById("FechaInicio");
    var search_dateSalida = <HTMLFormElement> document.getElementById("FechaFinal");
    search_dateSalida.min = search_dateEntrada.value;
  }

  // This function disables this component
  cancelarTiempoParoEditar(){
    this.cambio.emit(false);
    this.cortina[0].style.visibility = 'hidden';
  }
}
