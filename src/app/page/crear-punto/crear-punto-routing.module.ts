import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearPuntoPage } from './crear-punto.page';

const routes: Routes = [
  {
    path: '',
    component: CrearPuntoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearPuntoPageRoutingModule {}
