import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RetalService {

  /* Retal Extrusion Cantidad */
  private myAppUrlRetalExtrusionCantidad = 'https://localhost:44307/';
  // private myAppUrlRetalExtrusionCantidad = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlRetalExtrusionCantidad = 'api/RetalExtrusionCantidad/';

  /* Retal Extrusion */
  private myAppUrlRetalExtrusion = 'https://localhost:44307/';
  // private myAppUrlRetalExtrusion = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlRetalExtrusion = 'api/RetalExtrusion/';

  /* Retal Impresion Cantidad */
  private myAppUrlRetalImpresionCantidad = 'https://localhost:44307/';
  // private myAppUrlRetalImpresionCantidad = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlRetalImpresionCantidad = 'api/RetalImpresionCantidad/';

  /* Retal Impresion */
  private myAppUrlRetalImpresion = 'https://localhost:44307/';
  // private myAppUrlRetalImpresion = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlRetalImpresion = 'api/RetalImpresion/';

  /* Retal Refilado Cantidad */
  private RetalRefiladoCantidad = 'https://localhost:44307/';
  // private RetalRefiladoCantidad = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlRetalRefiladoCantidad = 'api​/RetalRefiladoCantidad/';

  /* Retal Refilado */
  private myAppUrlRetalRefilado = 'https://localhost:44307/';
  // private myAppUrlRetalRefilado = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlRetalRefilado = 'api​/RetalRefilado/';




  public RetalExtrusionActualizar: boolean = false;
  public RetalExtrusionEliminar: number = 0;
  public RetalExtrusionCantidadEliminar: number = 0;
  public RetalExtrusionTotal: number = 0;
  public RetalCorridaExtrusion : any[] = [
  ];



  constructor(private http: HttpClient) { }


  /* Retal Extrusion Cantidad */
  saveRetalExtrusionCantidad(retalExtrusionCantidad: any): Observable<any>{
    return this.http.post(this.myAppUrlRetalExtrusionCantidad + this.myApiUrlRetalExtrusionCantidad, retalExtrusionCantidad);
  }

  getRetalExtrusionCantidad(CorridaExtrusionId: number): Observable<any>{
    return this.http.get(this.myAppUrlRetalExtrusionCantidad + this.myApiUrlRetalExtrusionCantidad + CorridaExtrusionId);
  }

  updateRetalExtrusionCantidad(id: number, retalExtrusion: any): Observable<any>{
    return this.http.put(this.myAppUrlRetalExtrusionCantidad + this.myApiUrlRetalExtrusionCantidad + id, retalExtrusion);
  }

  deleteRetalExtrusionCantidad(id: number): Observable<any>{
    return this.http.delete(this.myAppUrlRetalExtrusionCantidad + this.myApiUrlRetalExtrusionCantidad + id);
  }



  /* Retal Extrusion */
  getRetalExtrusion(): Observable<any>{
    return this.http.get(this.myAppUrlRetalExtrusion + this.myApiUrlRetalExtrusion); 
  }

}
