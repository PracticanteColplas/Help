import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperarioService {

  /* Operario */
  private myAppUrlOperario = 'https://localhost:44307/';
  // private myAppUrlOperario = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlOperario = 'api/Operario/';

  /* Operario Corrida Extrusion */
  private myAppUrlOperarioCorridaExtrusion = 'https://localhost:44307/';
  // private myAppUrlOperarioCorridaExtrusion = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlOperarioCorridaExtrusion = 'api/OperarioCorridaExtrusion/';

  /* Operario Corrida Impresion */
  private myAppUrlOperarioCorridaImpresion = 'https://localhost:44307/';
  // private myAppUrlOperarioCorridaImpresion = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlOperarioCorridaImpresion = 'api/OperarioCorridaImpresion/';

  /* Operario Corrida Refilado */
  private myAppUrlOperarioCorridaRefilado = 'https://localhost:44307/';
  // private myAppUrlOperarioCorridaRefilado = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlOperarioCorridaRefilado = 'api/OperarioCorridaRefilado/';

  /* Operario Montaje */
  private myAppUrlOperarioMontaje = 'https://localhost:44307/';
  // private myAppUrlOperarioMontaje = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlOperarioMontaje = 'api/OperarioMontaje/';

  /* Operario Montaje */
  private myAppUrlOperarioInicioFinal = 'https://localhost:44307/';
  // private myAppUrlOperarioMontaje = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlOperarioInicioFinal = 'api/OperarioCorridaExtrusionInicioFinal/';


  public DatosOperarioCorridaInicio: any[] = [
  ];
  public DatosOperarioCorridaFinal: any[] = [
  ];
  public OperarioActulizarInicio: any = false;
  public OperarioActulizarFinalizar: any = false;



  constructor(private http: HttpClient) { }



  /* Operario */
  getOperario(id: number): Observable<any>{
    return this.http.get(this.myAppUrlOperario + this.myApiUrlOperario + id); 
  }

  /* Operario Corrida Extrusion */
  saveOperarioCorridaExtrusion(operario: any): Observable<any>{
    return this.http.post(this.myAppUrlOperarioCorridaExtrusion + this.myApiUrlOperarioCorridaExtrusion, operario);
  }

  /* Operario Corrida Extrusion id */
  getOperarioCorridaExtrusionOrden(orden: any): Observable<any>{
    return this.http.get(this.myAppUrlOperarioCorridaExtrusion + this.myApiUrlOperarioCorridaExtrusion + orden);
  }


  /* Operario Corrida Impresion */
  saveOperarioCorridaImpresion(operario: any): Observable<any>{
    return this.http.post(this.myAppUrlOperarioCorridaImpresion + this.myApiUrlOperarioCorridaImpresion, operario);
  }

  /* Operario Corrida Refilado */
  saveOperarioCorridaRefilado(operario: any): Observable<any>{
    return this.http.post(this.myAppUrlOperarioCorridaRefilado + this.myApiUrlOperarioCorridaRefilado, operario);
  }

  /* Operario Corrida Extrusion FinalInicio*/
  getOperarioCorridaExtrusionInicioFinal(corrida: any): Observable<any>{
    return this.http.get(this.myAppUrlOperarioInicioFinal + this.myApiUrlOperarioInicioFinal + corrida);
  }
}
