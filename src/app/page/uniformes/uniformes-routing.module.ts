import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UniformesPage } from './uniformes.page';

const routes: Routes = [
  {
    path: '',
    component: UniformesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UniformesPageRoutingModule {}
