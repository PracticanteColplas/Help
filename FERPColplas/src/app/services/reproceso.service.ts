import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReprocesoService {

  private myAppUrl = 'https://localhost:44307/';
  // private myAppUrl = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrl = 'api/Reproceso/';



  public ReprocesoActualizar: boolean = false;
  public Reproceso : any[] = [
  ];
  public ReprocesoPermisoEditar: boolean = false;
  public ReprocesoVer: any[] = [

  ];
  public ReprocesoPermisoVer: boolean = false;
  public totalKgReproceso: number = 0;


  public ReprocesoP: number = 0;
  public ReprocesoS: number = 0;
  public Reprocesos: any[] = [

  ];

  constructor(private http: HttpClient) { }


  saveReprocesoExtrusion(ReprocesoExtrusion: any): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, ReprocesoExtrusion);
  }

  countReprocesoExtrusion(ReprocesoExtrusionId: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + ReprocesoExtrusionId);
  }

  updateReprocesoExtrusion(id: number, ReprocesoExtrusion: any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id, ReprocesoExtrusion);
  }


}
