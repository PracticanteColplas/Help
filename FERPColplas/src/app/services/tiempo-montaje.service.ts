import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiempoMontajeService {

  private myAppUrl = 'https://localhost:44307/';
  // private myAppUrl = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrl = 'api/TiempoMontaje/';

  constructor(private http: HttpClient) { }

  getOrdenesProduccion(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl); 
  }

}
