import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiempoParoService {

  /* Tiempo Paro Extrusion */
  private myAppUrlTiempoParoExtrusion = 'https://localhost:44307/';
  // private myAppUrlTiempoParoExtrusion = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlTiempoParoExtrusion = 'api/TiempoParoExtrusion/';

  /* Tiempo Paro Impresion */
  private myAppUrlTiempoParoImpresion = 'https://localhost:44307/';
  // private myAppUrlTiempoParoImpresion = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlTiempoParoImpresion = 'api​/TiempoParoImpresion/';

  /* Tiempo Paro Refilado */
  private myAppUrlTiempoParoRefilado = 'https://localhost:44307/';
  // private myAppUrlTiempoParoRefilado = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlTiempoParoRefilado = 'api​/TiempoParoRefilado/';



  /* Tiempo Paro Extrusion */
  public TiempoParoActualizar: boolean = false;
  public TiempoParo : any[] = [
  ];
  public TiempoParoPermisoEditar: boolean = false;
  public TiempoParoEliminar: number = 0;
  
  public TiempoParoTotal: number = 0;
  public TiempoParoEliminarElemento: any[] = [];
  


  constructor(private http: HttpClient) { }




  /* Tiempo Paro Extrusion */
  saveTiempoParoExtrusion(tiempoParoExtrusion: any): Observable<any>{
    return this.http.post(this.myAppUrlTiempoParoExtrusion + this.myApiUrlTiempoParoExtrusion, tiempoParoExtrusion);
  }

  countTiempoParoExtrusion(CorridaExtrusionId: number): Observable<any>{
    return this.http.get(this.myAppUrlTiempoParoExtrusion + this.myApiUrlTiempoParoExtrusion + CorridaExtrusionId);
  }

  updateTiempoParoExtrusion(id: number, tiempoParoExtrusion: any): Observable<any>{
    return this.http.put(this.myAppUrlTiempoParoExtrusion + this.myApiUrlTiempoParoExtrusion + id, tiempoParoExtrusion);
  }

  deleteTiempoParoExtrusion(id: number): Observable<any>{
    return this.http.delete(this.myAppUrlTiempoParoExtrusion + this.myApiUrlTiempoParoExtrusion + id);
  }
}
