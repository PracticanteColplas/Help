import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsumoMPriExtrusionService {

  private myAppUrlConsumoMPriExtrusion = 'https://localhost:44307/';
  // private myAppUrlConsumoMPriExtrusion = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlConsumoMPriExtrusion = 'api/ConsumoMPriExtrusion/';

  public ConsumoMPriActualizar: boolean = false;
  public MPriEliminar: number = 0;
  public MPriExtrusionTotal: number = 0;
  public MPriExtrusion : any[] = [
  ];

  public MPriExtrusionCantidadTotal : any[] = [
  ];

  public MPriExtrusionTotalIngresada : any[] = [
  ];

  public MPriExtrusionCambioB: number = 0;
  public MPriExtrusionCambioJ: number = 0;


  constructor(private http: HttpClient) { }


  saveConsumoMPriExtrusion(ConsumoMPriExtrusion: any): Observable<any>{
    return this.http.post(this.myAppUrlConsumoMPriExtrusion + this.myApiUrlConsumoMPriExtrusion, ConsumoMPriExtrusion);
  }

  getConsumosMPriExtrusion(id: number): Observable<any>{
    return this.http.get(this.myAppUrlConsumoMPriExtrusion + this.myApiUrlConsumoMPriExtrusion + id); 
  }

  updateMPriExtrusionCantidad(id: number, MPri: any): Observable<any>{
    return this.http.put(this.myAppUrlConsumoMPriExtrusion + this.myApiUrlConsumoMPriExtrusion + id, MPri);
  }

  deleteMPriExtrusionCantidad(id: number): Observable<any>{
    return this.http.delete(this.myAppUrlConsumoMPriExtrusion + this.myApiUrlConsumoMPriExtrusion + id);
  }
}
