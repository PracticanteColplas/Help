import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdenProduccionService {

  private myAppUrl = 'https://localhost:44307/';
  // private myAppUrl = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrl = 'api/OrdenProduccion/';


  public DatosOrdenProduccion: any[] = [
  ];

  public reiniciar: boolean = false;
  public reiniciar2: boolean = false;

  public CorridasOrdenProduccion: any[] = [
  ];

  public paginaActual: number = 0;
  public corridaSinFinalizarEx: boolean = false;


  constructor(private http: HttpClient) { }

  getOrdenProduccion(id: string): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + id); 
  }

  getOrdenesProduccion(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl); 
  }
}
