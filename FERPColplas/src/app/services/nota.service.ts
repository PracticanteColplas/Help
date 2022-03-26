import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  /* Nota Extrusion */
  private myAppUrlNotaExtrusion = 'https://localhost:44307/';
  // private myAppUrlNotaExtrusion = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlNotaExtrusion = 'api/NotaExtrusion/';

  /* Nota Impresion */
  private myAppUrlNotaImpresion = 'https://localhost:44307/';
  // private myAppUrlNotaImpresion = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlNotaImpresion = 'api/NotaImpresion/';

  /* Nota Refilado */
  private myAppUrlNotaRefilado = 'https://localhost:44307/';
  // private myAppUrlNotaRefilado = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlNotaRefilado = 'api/NotaRefilado/';




  /* Nota Extrusion */
  public NotaActualizar: boolean = false;
  public Nota : any[] = [
  ];
  public NotaPermisoEditar: boolean = false;
  public NotaEliminar: number = 0;

  public PruebaNota : any[] = [
  ];


  constructor(private http: HttpClient) { }



  /* Nota Extrusion */
  saveNotaExtrusion(notaExtrusion: any): Observable<any>{
    return this.http.post(this.myAppUrlNotaExtrusion + this.myApiUrlNotaExtrusion, notaExtrusion);
  }

  countNotaExtrusion(notaExtrusionId: number): Observable<any>{
    return this.http.get(this.myAppUrlNotaExtrusion + this.myApiUrlNotaExtrusion + notaExtrusionId);
  }

  updateNotaExtrusion(id: number, notaExtrusion: any): Observable<any>{
    return this.http.put(this.myAppUrlNotaExtrusion + this.myApiUrlNotaExtrusion + id, notaExtrusion);
  }

  deleteNotaExtrusion(id: number): Observable<any>{
    return this.http.delete(this.myAppUrlNotaExtrusion + this.myApiUrlNotaExtrusion + id);
  }


}
