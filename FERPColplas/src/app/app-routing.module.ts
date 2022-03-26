import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrdenProduccionComponent } from './components/orden-produccion/orden-produccion.component';
import { RegistroSalidaProduccionComponent } from './components/registro-salida-produccion/registro-salida-produccion.component';

// imports Corrida extrusion
import { CorridaExtrusionInicioComponent } from './components/corrida-extrusion/corrida-extrusion-inicio/corrida-extrusion-inicio.component';
import { CorridaExtrusionPrincipalComponent } from './components/corrida-extrusion/corrida-extrusion-principal/corrida-extrusion-principal.component';
import { IniciarSesionComponent } from './components/iniciar-sesion/iniciar-sesion.component';
import { BuscarOrdenProduccionComponent } from './components/orden-produccion-buscar/buscar-orden-produccion/buscar-orden-produccion.component';

// Acceso rutas
const routes: Routes = [
  { path: 'ordenproduccion/:ordenProduccion/:proceso', component: OrdenProduccionComponent },
  { path: '', component: RegistroSalidaProduccionComponent },
  { path: 'corridaextrusion', component: CorridaExtrusionPrincipalComponent },
  { path: 'iniciarsesion', component: IniciarSesionComponent },
  { path: 'ordenproduccionBuscar', component: BuscarOrdenProduccionComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
