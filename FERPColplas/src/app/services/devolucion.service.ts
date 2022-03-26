import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DevolucionService {

  private myAppUrlDevolucion = 'https://localhost:44307/';
  // private myAppUrlDevolucion = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlDevolucion = 'api/Devolucion/';

  constructor(private http: HttpClient) { }

  /* Devolucion extrusion */
  public DevolucionActualizar: boolean = false;
  public DevolucionActualizarFinal: boolean = false;
  public MaterialSalida : any[] = [
  ];
  public MaterialSalidaPermisoEditar: boolean = false;
  public MaterialSalidaVer: any[] = [

  ];
  public MaterialSalidaPermisoVer: boolean = false;
  public DevolucionCantidadTotal: any[] = [

  ];
  public DevolucionPkDescripcion: any[] = [

  ];
  public DevolucionTotal: number = 0;

  public iniciarMostrarDevolucionExtrusion: boolean = false;

  public DevolucionOrdenProduccion: any[] = [

  ];

  saveDevolucionService(Devolucion: any): Observable<any>{
    return this.http.post(this.myAppUrlDevolucion + this.myApiUrlDevolucion, Devolucion);
  }

  countDevoluciones(OrdenProduccionId: number): Observable<any>{
    return this.http.get(this.myAppUrlDevolucion + this.myApiUrlDevolucion + OrdenProduccionId);
  }
}
