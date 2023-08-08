import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MenuComponent } from './menuPricipal/menu/menu.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';

import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { ReactiveFormsModule } from '@angular/forms';







@NgModule({
  declarations: [AppComponent,MenuComponent],
  imports: [ReactiveFormsModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule,
     provideFirebaseApp(() => initializeApp(environment.firebase)),
     provideAuth(() => getAuth()),
     provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging())],
  providers: [{  provide: FIREBASE_OPTIONS, useValue: environment.firebase, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  exports:[]


})
export class AppModule {}
//providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
