import { Component, OnInit, Input } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { OrdenProduccionService } from 'src/app/services/orden-produccion.service';
import { OperarioService } from 'src/app/services/operario.service';
import { CorridaService } from 'src/app/services/corrida.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro-salida-produccion',
  templateUrl: './registro-salida-produccion.component.html',
  styleUrls: ['./registro-salida-produccion.component.css']
})
export class RegistroSalidaProduccionComponent  {
  
  ngOnInit(): void {
  }

  
  listOrdenProduccion : any[] = [
  ]; 
  form: FormGroup;
  date = new Date();

  constructor(
    private fb: FormBuilder, 
    private router : Router, 
    private _ordenProduccionService: OrdenProduccionService,
    private _corridaService: CorridaService,
    private toastr: ToastrService,
    private _operarioService: OperarioService,
  ) 
  {
    this.form = this.fb.group({
      proceso: ['', [Validators.required]], 
      numeroOrdenProduccion: ['', [
        Validators.required, 
      ]],
    })

  }

  obtenerOrdenProduccion(){
    
    this._corridaService.DatosEntradaSalida = [];

    var numeroOrdenProduccion;

    // That gets the data
    const ordenProduccion: any = {
      proceso: this.form.get('proceso')?.value,
      numeroOrdenProduccion: "OP0" + this.form.get('numeroOrdenProduccion')?.value,

    }     
    
    // hat verify the existence of that OrdenProduccion
    this._ordenProduccionService.getOrdenProduccion(ordenProduccion.numeroOrdenProduccion).subscribe(data => {
      
      if (data[0][0].length != 0) {
        
        this._corridaService.AlmacenarInformacionCorrida = [];
        this._ordenProduccionService.reiniciar = true;

        // That send the data and directs to a ordenproduccion
        this.router.navigate(['ordenproduccion', ordenProduccion.numeroOrdenProduccion, ordenProduccion.proceso ]);

      }else{
        this.toastr.error('lo sentimos la orden de produccion no se encontro', 'Orden de Produccion no encontrada!');
      }
      
    }, error => {
      console.log(error);
    })

  }


  Ctrl($scope)
  {
    $scope.date = new Date();
  }

}
