import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

 /* Rol */
 private myAppUrlRol = 'https://localhost:44307/';
//  private myAppUrlRol = 'http://colplas-001-site1.btempurl.com/';
 private myApiUrlRol = 'api/Rol/';



 constructor(private http: HttpClient) { }

 /* Rol */

 getRol(): Observable<any>{
   return this.http.get(this.myAppUrlRol + this.myApiUrlRol);
 }
}
