import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  /* Usuario */
  private myAppUrlUsuario = 'https://localhost:44307/';
  // private myAppUrlUsuario = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlUsuario = 'api/Usuario/';
  


  constructor(private http: HttpClient) { }

  /* Usuario */

  getUsuarioOrdenProduccion(rol: number, contrasena: string): Observable<any>{
    return this.http.get(this.myAppUrlUsuario + this.myApiUrlUsuario + rol + "?dos=" + contrasena);
  }


}
