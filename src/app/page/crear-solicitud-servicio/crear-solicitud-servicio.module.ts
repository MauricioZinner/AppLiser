import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, Validators } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearSolicitudServicioPageRoutingModule } from './crear-solicitud-servicio-routing.module';

import { CrearSolicitudServicioPage } from './crear-solicitud-servicio.page';
import { ReactiveFormsModule } from '@angular/forms';
//import { TypeaheadComponent } from 'src/app/menuPricipal/typeahead/typeahead.component';
import { ModuleModule } from 'src/app/menuPricipal/module.module';
import { PersonalModule } from 'src/app/menuPricipal/personal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearSolicitudServicioPageRoutingModule,
    ReactiveFormsModule,
    ModuleModule,
    PersonalModule
  ],
  declarations: [CrearSolicitudServicioPage]
})
export class CrearSolicitudServicioPageModule {

}
