import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeaheadComponent } from './typeahead/typeahead.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [TypeaheadComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[TypeaheadComponent]
})
export class PersonalModule { }
