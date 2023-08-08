import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  //rol!:'empleado'|'supervisor'
  rol:any

  constructor(
              private auth:AuthService,
              private router:Router,
              private menu:MenuController,
              private firestore: FirestoreService
    ) {
              this.auth.stateUser().subscribe(
                res=>{

                        if(res){
                            console.log('Si esta logeado');
                            this.getDatosUser(res.uid)

                        }else{

                            console.log('No esta logeado');

                        }
                }
              )

    }

  ngOnInit() {}

  logout(){

      console.log('Cerrar Sesion')
      this.auth.logout();
      this.router.navigate(['/login']);

  }

  getDatosUser(id: string){

    const path = 'usuarios';


    this.firestore.getDoc(path,id).subscribe((res:any)=>{

         this.rol=res.perfil,
         console.log('Datos individuales',res),
         console.log('Datos individuales',this.rol)
    })
 }

}
