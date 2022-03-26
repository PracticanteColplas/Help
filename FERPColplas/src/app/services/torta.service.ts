import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TortaService {

  /* Torta */
  private myAppUrlTorta = 'https://localhost:44307/';
  // private myAppUrlTorta = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlTorta = 'api/Torta/';

  /* Torta Extrusion */
  private myAppUrlTortaExtrusion = 'https://localhost:44307/';
  // private myAppUrlTortaExtrusion = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlTortaExtrusion = 'api/TortaExtrusion/';

  


  public TortaExtrusionActualizar: boolean = false;
  public TortaExtrusionEliminar: number = 0;
  public TortaCorridaExtrusion : any[] = [
  ];


  constructor(private http: HttpClient) { }




  /* Torta Extrusion */
  saveTortaExtrusionCantidad(tortaExtrusionCantidad: any): Observable<any>{
    return this.http.post(this.myAppUrlTortaExtrusion + this.myApiUrlTortaExtrusion, tortaExtrusionCantidad);
  }

  getTortaExtrusionCantidad(TortaExtrusionId: number): Observable<any>{
    return this.http.get(this.myAppUrlTortaExtrusion + this.myApiUrlTortaExtrusion + TortaExtrusionId);
  }

  updateTortaExtrusionCantidad(id: number, tortaExtrusion: any): Observable<any>{
    return this.http.put(this.myAppUrlTortaExtrusion + this.myApiUrlTortaExtrusion + id, tortaExtrusion);
  }

  deleteTortaExtrusionCantidad(id: number): Observable<any>{
    return this.http.delete(this.myAppUrlTortaExtrusion + this.myApiUrlTortaExtrusion + id);
  }



  /* Torta */
  getTortaExtrusion(): Observable<any>{
    return this.http.get(this.myAppUrlTorta + this.myApiUrlTorta); 
  }
}
