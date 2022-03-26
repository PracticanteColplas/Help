import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResumenCorridaLiquidacionMaterialesService {

  private myAppUrl = 'https://localhost:44307/';
  // private myAppUrl = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlResumenCorrida = 'api/ResumenCorrida/';
  private myApiUrlLiquidacionMateriales = 'api/LiquidacionMateriales/';

  public RetalExtrusionTotal: number = 0;
  public ResumenTotalProducido: number = 0;
  

  constructor(private http: HttpClient) { }

  /* Resumen Corrida Extrusion id */
  getResumenCorrida(id: any): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrlResumenCorrida + id);
  }

  /* Liquidacion Corrida Extrusion id */
  getLiquidacionMateriales(id: any): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrlLiquidacionMateriales + id);
  }


}
