import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  /* Impresion Entrada*/
  private myAppUrlMaterialEntradaImpresion = 'https://localhost:44307/';
  // private myAppUrlMaterialEntradaImpresion = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlMaterialEntradaImpresion = 'api/MaterialEntradaImpresion/';

  /* Refilado Entrada */
  private myAppUrlMaterialEntradaRefilado = 'https://localhost:44307/';
  // private myAppUrlMaterialEntradaRefilado = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlMaterialEntradaRefilado = 'api/MaterialEntradaRefilado/';

  /* Extrusion */
  private myAppUrlMaterialSalidaExtrusion = 'https://localhost:44307/';
  // private myAppUrlMaterialSalidaExtrusion = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlMaterialSalidaExtrusion = 'api/MaterialSalida/';

  /* Impresion Salida */
  private myAppUrlMaterialSalidaImpresion = 'https://localhost:44307/';
  // private myAppUrlMaterialSalidaImpresion = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlMaterialSalidaImpresion = 'api​/MaterialSalidaImpresion/';

  /* Refilado Salida */
  private myAppUrlMaterialSalidaRefilado = 'https://localhost:44307/';
  // private myAppUrlMaterialSalidaRefilado = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlMaterialSalidaRefilado = 'api/MaterialSalidaRefilado/';


  /* Rollos for the last 30 days */
  // private myAppUrlMaterialSalidaRefilado = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlUltimosRollos = 'api/UltimosRollos/';



  /* Material salida extrusion */
  public MaterialSalidaActualizar: boolean = false;
  public MaterialSalida : any[] = [
  ];
  public MaterialSalidaPermisoEditar: boolean = false;
  public MaterialSalidaVer: any[] = [

  ];
  public MaterialSalidaPermisoVer: boolean = false;
  public MaterialSalidaTotal: number = 0;
  public totalKgReproceso: number = 0;

  public MaterialSalidaP: number = 0;
  public MaterialSalidaS: number = 0;
  public MaterialesSalida: any[] = [

  ];




  constructor(private http: HttpClient) { }

  /* Funciones material impresion */

  getOrdenesProduccion(): Observable<any>{
    return this.http.get(this.myAppUrlMaterialEntradaImpresion + this.myApiUrlMaterialEntradaImpresion); 
  }

  
  /* Funciones material extrusion */

  saveMaterialSalidaExtrusion(materialSalidaExtrusion: any): Observable<any>{
    return this.http.post(this.myAppUrlMaterialSalidaExtrusion + this.myApiUrlMaterialSalidaExtrusion, materialSalidaExtrusion);
  }

  countMaterialSalidaExtrusion(CorridaExtrusionId: number): Observable<any>{
    return this.http.get(this.myAppUrlMaterialSalidaExtrusion + this.myApiUrlMaterialSalidaExtrusion + CorridaExtrusionId);
  }

  updateMaterialSalidaExtrusion(id: number, materialSalidaExtrusion: any): Observable<any>{
    return this.http.put(this.myAppUrlMaterialSalidaExtrusion + this.myApiUrlMaterialSalidaExtrusion + id, materialSalidaExtrusion);
  }


  /* This function allows to get the last rolls in the last 30 days */

  getRollosUltimosDias(fecha: string): Observable<any>{
    return this.http.get(this.myAppUrlMaterialSalidaExtrusion + this.myApiUrlUltimosRollos + fecha); 
  }


}
