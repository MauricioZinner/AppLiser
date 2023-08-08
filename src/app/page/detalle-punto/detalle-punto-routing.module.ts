import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallePuntoPage } from './detalle-punto.page';

const routes: Routes = [
  {
    path: '',
    component: DetallePuntoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallePuntoPageRoutingModule {}
