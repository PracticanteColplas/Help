import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CorridaService {
  public AlmacenarInformacionCorrida: any[] = [
  ];
  public numeroCorridaPagination: number = 0;

  private myAppUrlCorridaExtrusion = 'https://localhost:44307/';
  // private myAppUrlCorridaExtrusion = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlCorridaExtrusion = 'api/CorridaExtrusion/';


  private myAppUrlCorridaImpresion = 'https://localhost:44307/';
  // private myAppUrlCorridaImpresion = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlCorridaImpresion = '/api/CorridaImpresion/';


  private myAppUrlCorridaRefilado = 'https://localhost:44307/';
  // private myAppUrlCorridaRefilado = 'http://colplas-001-site1.btempurl.com/';
  private myApiUrlCorridaRefilado = 'api/CorridaRefilado/';

  public InformacionActualizar: boolean = false;
  public OperarioCorridaExtrusionInicio: any[] = [
  ];
  public InformacionActualizarInicioFinal: boolean;


  public OperarioCorridaExtrusionFinal: any[] = [
  ];
  public AceptarMaterialSalida: boolean = false;
  public AceptarRetalExtrusion: boolean = false;
  public AceptarTiempoParo: boolean = false;
  public AceptarObservacion: boolean = false;
  public AceptarTorta: boolean = false;
  public AceptarDevolucion: boolean = false;
  public AceptarRetal: boolean = false;
  public AceptarMPri: boolean = false;


  public CorridaExtrusion: any[] = [
  ];

  public DatosOperarioCorridaInicio: any[] = [
  ];

  public CorridaExtrusionFinal: boolean = true;
  public CorridaExtrusionFinalDesactivar: boolean = true;
  public DuracionCorrida: number = 0;
  public ActualizarDuracionCorrida: boolean = false;


  public boton: boolean = false;

  public DatosEntradaSalida: any[] = [
  ];
  public DatosCorridaNoFinalizada: any[] = [
  ];

  public CorridaNoFinalizadaActivar: boolean = false;
  public IngresarNuevaCorrida: boolean = false;
  public ActualizarMenu: boolean = false;



  constructor(private http: HttpClient) { }

  getCorridaExtrusionPk(id: number): Observable<any>{
    return this.http.get( this.myAppUrlCorridaExtrusion + this.myApiUrlCorridaExtrusion + id.toString() ); 
  }

  saveCorridaExtrusion(corridaExtrusion: any): Observable<any>{
    return this.http.post(this.myAppUrlCorridaExtrusion + this.myApiUrlCorridaExtrusion,  corridaExtrusion );
  }
}
