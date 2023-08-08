import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { GeolocalizadorService } from '../../services/geolocalizador.service';
declare var google:any;
@Component({
  selector: 'app-detalle-punto',
  templateUrl: './detalle-punto.page.html',
  styleUrls: ['./detalle-punto.page.scss'],
})
export class DetallePuntoPage implements OnInit, OnChanges{

  id:any;
  punto:any;
  agencia:any;
  map = null;
  mapEle:any

  localization:any=[]
  dataLocation:any
  dataLocationGeolocation:any


  constructor(

            private route: ActivatedRoute,
            private alertController: AlertController,
            private fb:FormBuilder,
            private auth: AuthService,
            private firestore: FirestoreService,
            private interaction:InteractionService,
            private geolocalizador:GeolocalizadorService
  ) {


            this.route.queryParams.subscribe(params => {
              this.id = params['id'];
              console.log(this.id);
              this.getPunto(this.id)
            });


  }

  ngOnInit() {

    console.log('Ingresé al ngOnInit')

  }

  ngOnChanges(): void {

      console.log('Propiedad "data" cambió:');


  }

  getPunto(id:any){

    console.log(id)
    const path='puntos'
        this.firestore.getDoc(path,id).subscribe(
              (res:any)=>{

                     console.log(res)
                     this.punto=res
                     console.log(this.punto)
                     this.getAgencia(res.nombre)
              }
        )
  }

  getAgencia(id:any){


         const path='agencias'
         this.firestore.getDoc(path,id).subscribe(
                  res=>{

                        this.agencia = res
                        console.log(this.agencia)
                        const lat=this.agencia.latitud
                        const lng=this.agencia.longitud
                        const dataLocationAgencia={lat,lng}
                        console.log(dataLocationAgencia);
                        this.loadMap(dataLocationAgencia);

                         this.geolocalizador.location().then(

                             res=>{

                                  console.log(res.coords.latitude)
                             }
                        )
                  }
         )
  }

  onClick(){


  }


loadMap(dataLocation:any) {

          // create a new map by passing HTMLElement
          const mapEle: HTMLElement|null = document.getElementById('map');
          // create LatLng object

          // const myLatLng = {lat: -0.15491733448221182, lng: -78.46955852743518};
          const myLatLng  =dataLocation;
          console.log('myLatLng 2',myLatLng )
          console.log('myLatLng 2',dataLocation )
            // create map
            this.map = new google.maps.Map(mapEle, {
              center: dataLocation,
              zoom: 18
            });

            google.maps.event.addListenerOnce(this.map, 'idle', () => {

              mapEle!.classList.add('show-map');
              //this.addMarker(this.localizar)
              console.log('entro al idle 3')
              this.addMarker(dataLocation)
            });
}

/* renderMarker(){

        this.localization.forEach((element:any) => {

          this.addMarker(element)
        });
} */

  addMarker(marker:any) {

          console.log('4 ',marker)
          return new google.maps.Marker({
            position: marker,
            map: this.map,
          });
  }

  iniciarTurno(){


         console.log(this.agencia.latitud,this.agencia.longitud)
         console.log(this.dataLocationGeolocation)
         this.addMarker(this.dataLocationGeolocation)
  }






}
