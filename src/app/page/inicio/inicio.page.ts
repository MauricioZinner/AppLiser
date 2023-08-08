import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from 'src/app/services/auth.service';
import { PhotosService } from 'src/app/services/photos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  lo!:boolean
  rol!:any
  idEmpleado:any
  idsSolicitudServicioArray:any;
  puntos:any


  //FOTOS
  photoss:any[] =[]


  constructor(private menu:MenuController,
              private firestore: FirestoreService,
              private auth:AuthService,
              private photosService:PhotosService,
              private router:Router
              ) {
        //this.obtenerId();
        this.auth.stateUser().subscribe(
                  res=>{

                          if(res){
                              console.log('Si esta logeado');
                              this.idEmpleado=res.uid;
                              console.log(this.idEmpleado);
                              // Obtener los datos del usuario
                              this.getDatosUser(res.uid)
                               // Obtener Solicitud de Servcicio
                              this.getSolicitudesServicio(res.uid)

                              // Obtener Puntos
                              this.getPuntos(res.uid)

                          }else{

                              console.log('No esta logeado');

                          }
                  }
             )

             this.photoss=this.photosService.photos
   }

ngOnInit() {




}

IniciarPunto(id:any){

      console.log(id)
      this.router.navigate(['/home/detalle-punto'], { queryParams: { id: id } });
}



 getDatosUser(id: string){

    const path = 'usuarios';
    this.firestore.getDoc(path,id).subscribe((res:any)=>{

         this.rol=res.perfil
         console.log('Datos individuales',res)
    })
 }



 getSolicitudesServicio(id:any){

        const  path='AsignacionSolicitudServicio';
        console.log(path,this.idEmpleado)
        this.firestore.getCollectionQuery(path,'idEmpleado','==',id).subscribe(
               res=>{

                  const idSolicitudServicioArray = res.map((item:any) => item.idSolicitudServicio);
                  console.log(idSolicitudServicioArray)
                  const idsSolicitudServicioArray:any=[];
                  idSolicitudServicioArray.forEach((idSolicitudServ:any)=>{
                              const path = 'solicitudServicio';
                              console.log(idSolicitudServ)
                              this.firestore.getDoc(path,idSolicitudServ).subscribe(
                                     res=>{
                                          console.log(res)
                                          idsSolicitudServicioArray.push(res)
                                    }


                              )
                  })


                 this.idsSolicitudServicioArray=idsSolicitudServicioArray

               }
        )
}

getPuntos(id:any){

      const  path='AsignacionPunto';
      console.log(path,this.idEmpleado)
      this.firestore.getCollectionQuery(path,'idEmpleado','==',id).subscribe(
            res=>{

               console.log(res)
                const idPuntoArray = res.map((item:any) => item.idPunto);
                console.log(idPuntoArray)
                const puntos:any=[];
                idPuntoArray.forEach((idPunto:any)=>{

                            const path = 'puntos';
                            console.log(idPunto)
                            this.firestore.getDoc(path,idPunto).subscribe(
                                  res=>{
                                        console.log(res)
                                        puntos.push(res)
                                  }
                            )
                })


                this.puntos=puntos
                console.log(puntos)



            }
      )

}


async takePhoto(){

      await this.photosService.addNewPhoto()
  }

}
