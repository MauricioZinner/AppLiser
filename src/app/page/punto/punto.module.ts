import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PuntoPageRoutingModule } from './punto-routing.module';

import { PuntoPage } from './punto.page';

import { ModuleModule } from 'src/app/menuPricipal/module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PuntoPageRoutingModule,
    ModuleModule
  ],
  declarations: [PuntoPage]
})
export class PuntoPageModule {}
