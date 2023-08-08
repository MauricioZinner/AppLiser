import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleSolicitudServicioPageRoutingModule } from './detalle-solicitud-servicio-routing.module';

import { DetalleSolicitudServicioPage } from './detalle-solicitud-servicio.page';



import { ModuleModule } from 'src/app/menuPricipal/module.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleSolicitudServicioPageRoutingModule,
    ModuleModule
  ],
  declarations: [DetalleSolicitudServicioPage]
})
export class DetalleSolicitudServicioPageModule {}
