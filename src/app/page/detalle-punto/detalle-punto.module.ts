import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallePuntoPageRoutingModule } from './detalle-punto-routing.module';

import { DetallePuntoPage } from './detalle-punto.page';


import { ModuleModule } from 'src/app/menuPricipal/module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallePuntoPageRoutingModule,
    ModuleModule
  ],
  declarations: [DetallePuntoPage]
})
export class DetallePuntoPageModule {}
