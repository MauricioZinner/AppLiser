import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearPuntoPageRoutingModule } from './crear-punto-routing.module';

import { CrearPuntoPage } from './crear-punto.page';

import { ModuleModule } from 'src/app/menuPricipal/module.module';
import { PersonalModule } from 'src/app/menuPricipal/personal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearPuntoPageRoutingModule,
    ReactiveFormsModule,
    ModuleModule,
    PersonalModule

  ],
  declarations: [CrearPuntoPage]
})
export class CrearPuntoPageModule {}
