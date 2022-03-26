import { Component, OnInit, Input } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { UsuarioService } from 'src/app/services/usuario.service';
import { RolService } from 'src/app/services/rol.service';
import { OrdenProduccionService } from 'src/app/services/orden-produccion.service';

import { ToastrService } from 'ngx-toastr';

import { Location } from '@angular/common';



import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent {



  location: Location;
  ngOnInit(): void {
    
    this._ordenProduccionService.reiniciar2 = true;
   
    this._rolService.getRol().subscribe(data => {

      this.listRol = data;
     
    }, error => {
      console.log(error);
    })
    
  }

  ngOnChanges(){
    this.form.reset();
  }


  listOrdenProduccion : any[] = [
  ]; 
  listRol : any[] = [
  ]; 
  form: FormGroup;


  constructor(
    private fb: FormBuilder, 
    private router : Router, 
    private _usuarioService: UsuarioService,
    private _rolService: RolService,
    private toastr: ToastrService,
    private _ordenProduccionService: OrdenProduccionService,
    location: Location
  ) 
  {
    this.form = this.fb.group({
      rol: ['', [Validators.required]], 
      contrasena: ['', [
        Validators.required, 
      ]],
    })
  }

  verificarUsuario(){

    var numeroOrdenProduccion;

    // That's for get the insert data 
    const usuario: any = {
      rol: this.form.get('rol')?.value,
      contrasena: this.form.get('contrasena')?.value,
    }     

    var hash = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(usuario.contrasena), "asdasd");
    var md5 = hash.toString(CryptoJS.enc.Hex)

    usuario.contrasena = md5;

    this._usuarioService.getUsuarioOrdenProduccion(usuario.rol, usuario.contrasena).subscribe(data => {

      if (data[0].length > 0) {
        this.router.navigate(['/ordenproduccionBuscar' ]);
      }else{
        this.toastr.error('El usuario no ha sido encontrado, vuelva a intentarlo', 'Error!');
      }
      
    }, error => {
      console.log(error);
    })

  }
}