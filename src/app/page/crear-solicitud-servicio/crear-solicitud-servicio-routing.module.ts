import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearSolicitudServicioPage } from './crear-solicitud-servicio.page';

const routes: Routes = [
  {
    path: '',
    component: CrearSolicitudServicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearSolicitudServicioPageRoutingModule {}
