import { NgModule } from '@angular/core';
import { ReactiveFormsModule/* , FormsModule */} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';

import { OrdenProduccionComponent } from './components/orden-produccion/orden-produccion.component';
import { RegistroSalidaProduccionComponent } from './components/registro-salida-produccion/registro-salida-produccion.component';


import { QRCodeModule } from 'angular2-qrcode';

import {NgxPrintModule} from 'ngx-print';

import {NgxPaginationModule} from 'ngx-pagination';



// Imports 
import { CorridaExtrusionInicioComponent } from './components/corrida-extrusion/corrida-extrusion-inicio/corrida-extrusion-inicio.component';
import { CorridaExtrusionPrincipalComponent } from './components/corrida-extrusion/corrida-extrusion-principal/corrida-extrusion-principal.component';
import { InformacionGeneralInicioComponent } from './components/corrida-extrusion/informacion-general/informacion-general-inicio/informacion-general-inicio.component';
import { MaterialSalidaPrincipalComponent } from './components/corrida-extrusion/material-salida/material-salida-principal/material-salida-principal.component';
import { MaterialSalidaIngresarComponent } from './components/corrida-extrusion/material-salida/material-salida-ingresar/material-salida-ingresar.component';
import { MaterialSalidaMostrarComponent } from './components/corrida-extrusion/material-salida/material-salida-mostrar/material-salida-mostrar.component';
import { MaterialSalidaEditarComponent } from './components/corrida-extrusion/material-salida/material-salida-editar/material-salida-editar.component';
import { MaterialSalidaVerComponent } from './components/corrida-extrusion/material-salida/material-salida-ver/material-salida-ver.component';
import { RetalIngresarComponent } from './components/corrida-extrusion/retal/retal-ingresar/retal-ingresar.component';
import { RetalPrincipalComponent } from './components/corrida-extrusion/retal/retal-principal/retal-principal.component';
import { RetalMostrarComponent } from './components/corrida-extrusion/retal/retal-mostrar/retal-mostrar.component';
import { RetalEditarComponent } from './components/corrida-extrusion/retal/retal-editar/retal-editar.component';
import { RetalEliminarComponent } from './components/corrida-extrusion/retal/retal-eliminar/retal-eliminar.component';
import { TiempoParoPrincipalComponent } from './components/corrida-extrusion/tiempo-paro/tiempo-paro-principal/tiempo-paro-principal.component';
import { TiempoParoIngresarComponent } from './components/corrida-extrusion/tiempo-paro/tiempo-paro-ingresar/tiempo-paro-ingresar.component';
import { TiempoParoMostrarComponent } from './components/corrida-extrusion/tiempo-paro/tiempo-paro-mostrar/tiempo-paro-mostrar.component';
import { TiempoParoEditarComponent } from './components/corrida-extrusion/tiempo-paro/tiempo-paro-editar/tiempo-paro-editar.component';
import { TiempoParoEliminarComponent } from './components/corrida-extrusion/tiempo-paro/tiempo-paro-eliminar/tiempo-paro-eliminar.component';
import { ObservacionesIngresarComponent } from './components/corrida-extrusion/observaciones/observaciones-ingresar/observaciones-ingresar.component';
import { ObservacionesMostrarComponent } from './components/corrida-extrusion/observaciones/observaciones-mostrar/observaciones-mostrar.component';
import { ObservacionesEditarComponent } from './components/corrida-extrusion/observaciones/observaciones-editar/observaciones-editar.component';
import { ObservacionesEliminarComponent } from './components/corrida-extrusion/observaciones/observaciones-eliminar/observaciones-eliminar.component';
import { ObservacionesPrincipalComponent } from './components/corrida-extrusion/observaciones/observaciones-principal/observaciones-principal.component';
import { ReprocesoPrincipalComponent } from './components/corrida-extrusion/reproceso/reproceso-principal/reproceso-principal.component';
import { ReprocesoIngresarComponent } from './components/corrida-extrusion/reproceso/reproceso-ingresar/reproceso-ingresar.component';
import { ReprocesoMostrarComponent } from './components/corrida-extrusion/reproceso/reproceso-mostrar/reproceso-mostrar.component';
import { ReprocesoVerComponent } from './components/corrida-extrusion/reproceso/reproceso-ver/reproceso-ver.component';
import { ReprocesoEditarComponent } from './components/corrida-extrusion/reproceso/reproceso-editar/reproceso-editar.component';
import { TortaEditarComponent } from './components/corrida-extrusion/Torta/torta-editar/torta-editar.component';
import { TortaEliminarComponent } from './components/corrida-extrusion/Torta/torta-eliminar/torta-eliminar.component';
import { TortaIngresarComponent } from './components/corrida-extrusion/Torta/torta-ingresar/torta-ingresar.component';
import { TortaMostrarComponent } from './components/corrida-extrusion/Torta/torta-mostrar/torta-mostrar.component';
import { TortaPrincipalComponent } from './components/corrida-extrusion/Torta/torta-principal/torta-principal.component';
import { MateriaPrimaIngresarComponent } from './components/corrida-extrusion/materia-prima/materia-prima-ingresar/materia-prima-ingresar.component';
import { MateriaPrimaPrincipalComponent } from './components/corrida-extrusion/materia-prima/materia-prima-principal/materia-prima-principal.component';
import { DevolucionPrincipalComponent } from './components/corrida-extrusion/devolucion/devolucion-principal/devolucion-principal.component';
import { DevolucionIngresarComponent } from './components/corrida-extrusion/devolucion/devolucion-ingresar/devolucion-ingresar.component';
import { DevolucionMostrarComponent } from './components/corrida-extrusion/devolucion/devolucion-mostrar/devolucion-mostrar.component';
import { DevolucionEditarComponent } from './components/corrida-extrusion/devolucion/devolucion-editar/devolucion-editar.component';
import { CorridaExtrusionFinalComponent } from './components/corrida-extrusion/corrida-extrusion-final/corrida-extrusion-final.component';
import { ResumenCorridaPrincipalComponent } from './components/corrida-extrusion/resumen-corrida/resumen-corrida-principal/resumen-corrida-principal.component';
import { ResumenCorridaMostrarComponent } from './components/corrida-extrusion/resumen-corrida/resumen-corrida-mostrar/resumen-corrida-mostrar.component';
import { LiquidacionMaterialesPrincipalComponent } from './components/corrida-extrusion/liquidacion-materiales/liquidacion-materiales-principal/liquidacion-materiales-principal.component';
import { LiquidacionMaterialesMostrarComponent } from './components/corrida-extrusion/liquidacion-materiales/liquidacion-materiales-mostrar/liquidacion-materiales-mostrar.component';
import { MateriaPrimaMostrarComponent } from './components/corrida-extrusion/materia-prima/materia-prima-mostrar/materia-prima-mostrar.component';
import { MateriaPrimaEliminarComponent } from './components/corrida-extrusion/materia-prima/materia-prima-eliminar/materia-prima-eliminar.component';
import { MateriaPrimaEditarComponent } from './components/corrida-extrusion/materia-prima/materia-prima-editar/materia-prima-editar.component';
import { MenuComponent } from './components/menu/menu.component';

import { DatePipe } from '@angular/common';



import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { BuscarOrdenProduccionComponent } from './components/orden-produccion-buscar/buscar-orden-produccion/buscar-orden-produccion.component';

import { FormsModule } from '@angular/forms';
import { OrdenProduccionVerComponent } from './components/orden-produccion-buscar/orden-produccion-ver/orden-produccion-ver.component';
import { APP_BASE_HREF } from '@angular/common';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    OrdenProduccionComponent,
    RegistroSalidaProduccionComponent,
    CorridaExtrusionInicioComponent,
    CorridaExtrusionPrincipalComponent,
    InformacionGeneralInicioComponent,
    MaterialSalidaPrincipalComponent,
    MaterialSalidaIngresarComponent,
    MaterialSalidaMostrarComponent,
    MaterialSalidaEditarComponent,
    MaterialSalidaVerComponent,
    RetalIngresarComponent,
    RetalPrincipalComponent,
    RetalMostrarComponent,
    RetalEditarComponent,
    RetalEliminarComponent,
    TiempoParoPrincipalComponent,
    TiempoParoIngresarComponent,
    TiempoParoMostrarComponent,
    TiempoParoEditarComponent,
    TiempoParoEliminarComponent,
    ObservacionesIngresarComponent,
    ObservacionesMostrarComponent,
    ObservacionesEditarComponent,
    ObservacionesEliminarComponent,
    ObservacionesPrincipalComponent,
    ReprocesoPrincipalComponent,
    ReprocesoIngresarComponent,
    ReprocesoMostrarComponent,
    ReprocesoVerComponent,
    ReprocesoEditarComponent,
    TortaEditarComponent,
    TortaEliminarComponent,
    TortaIngresarComponent,
    TortaMostrarComponent,
    TortaPrincipalComponent,
    MateriaPrimaIngresarComponent,
    MateriaPrimaPrincipalComponent,
    DevolucionPrincipalComponent,
    DevolucionIngresarComponent,
    DevolucionMostrarComponent,
    DevolucionEditarComponent,
    CorridaExtrusionFinalComponent,
    ResumenCorridaPrincipalComponent,
    ResumenCorridaMostrarComponent,
    LiquidacionMaterialesPrincipalComponent,
    LiquidacionMaterialesMostrarComponent,
    MateriaPrimaMostrarComponent,
    MateriaPrimaEliminarComponent,
    MateriaPrimaEditarComponent,
    MenuComponent,
    IniciarSesionComponent,
    BuscarOrdenProduccionComponent,
    OrdenProduccionVerComponent,


  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    QRCodeModule,
    NgxPrintModule,
    MatDialogModule,
    NgxPaginationModule,
    FormsModule
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    DatePipe,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
