import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UniformesPageRoutingModule } from './uniformes-routing.module';

import { UniformesPage } from './uniformes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UniformesPageRoutingModule
  ],
  declarations: [UniformesPage]
})
export class UniformesPageModule {}
