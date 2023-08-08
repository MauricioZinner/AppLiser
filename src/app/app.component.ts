import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navbar!:boolean
  constructor(private auth:AuthService) {
    this.auth.stateUser().subscribe(
      (res:any)=>{
              if(res){
                  console.log('Si esta logeado');
                  this.navbar=true;
              }else{
                  console.log('No esta logeado');
                  this.navbar=false;
              }
      }
    )
  }
}
