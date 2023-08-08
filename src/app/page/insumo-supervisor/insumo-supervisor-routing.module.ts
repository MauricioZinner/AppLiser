import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsumoSupervisorPage } from './insumo-supervisor.page';

const routes: Routes = [
  {
    path: '',
    component: InsumoSupervisorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsumoSupervisorPageRoutingModule {}
