import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BuscarOrdenProduccionService {

  public AceptarbuscarOrdenProduccionService: boolean = false;
  public OrdenProduccionID: string = '';
  public DescargarOrdenProduccionData: boolean = false;


  private myAppUrl = 'https://localhost:44307/';
  // private myAppUrl = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlTransferencia = 'api/Transferencia/';


  constructor(private http: HttpClient) { }

  getOrdenProduccion(idOrdenProduccion: string): Observable<any>{
    return this.http.get( this.myAppUrl + this.myApiUrlTransferencia + idOrdenProduccion.toString() ); 
  }


}
