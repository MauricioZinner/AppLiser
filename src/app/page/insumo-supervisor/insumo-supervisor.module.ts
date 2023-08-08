import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsumoSupervisorPageRoutingModule } from './insumo-supervisor-routing.module';

import { InsumoSupervisorPage } from './insumo-supervisor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsumoSupervisorPageRoutingModule
  ],
  declarations: [InsumoSupervisorPage]
})
export class InsumoSupervisorPageModule {}
