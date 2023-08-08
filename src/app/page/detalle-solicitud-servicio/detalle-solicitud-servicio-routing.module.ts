import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleSolicitudServicioPage } from './detalle-solicitud-servicio.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleSolicitudServicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleSolicitudServicioPageRoutingModule {}
