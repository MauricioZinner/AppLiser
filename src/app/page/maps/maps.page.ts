import { Component, OnInit } from '@angular/core';
import { Marker } from 'src/app/models/models';
import { Geolocation } from '@capacitor/geolocation';

import { AlertController } from '@ionic/angular';
import { InteractionService } from 'src/app/services/interaction.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { agencias } from 'src/app/models/models';

declare var google:any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {

  formRegister!: FormGroup;

  customActionSheetOptions = {
    header: 'Supervisores',
    subHeader: 'Seleccione un Supervisor',
  };

  data:agencias={

        nombreAgencia:'',
        latitud:0,
        longitud:0,
        supervisor:'',
        direccion:'' ,
        idAgencia:''
  }

  supervisores:any
  ubicacionEmpleadoLatitud: any;
  ubicacionEmpleadoLongitud: any;
  distancias: any;
  public alertButtons = ['OK'];

  geolocationOptions:any = {
    //enableHighAccuracy: true, // Precisión alta para mejorar la exactitud (opcional)
    // Tiempo de espera máximo para obtener la ubicación en milisegundos (opcional)
  };

  map = null;
  mapEle:any
  mapas:any

  markers:any[]=[]

  constructor(
            private alertController: AlertController,
            private fb:FormBuilder,
            private auth: AuthService,
            private firestore: FirestoreService,
            private interaction:InteractionService
    ) { }

  ngOnInit() {

            this.loadMap()
            this.getSupervisores()

            this.formRegister=this.fb.group({

              nombreAgencia: ['', Validators.required],
              latitud: [],
              longitud: [],
              supervisor: ['', Validators.required],
              direccion: ['', Validators.required],

            });
  }

  loadMap() {
        // create a new map by passing HTMLElement
        const mapEle: HTMLElement|null = document.getElementById('map');
        // create LatLng object

        const myLatLng = {lat: -0.15491733448221182, lng: -78.46955852743518};
        // create map
        this.map = new google.maps.Map(mapEle, {
          center: myLatLng,
          zoom: 12
        });

        google.maps.event.addListenerOnce(this.map, 'idle', () => {

          mapEle!.classList.add('show-map');
          this.renderMarkers();
        });


  }

  renderMarkers() {

        /*   this.markers.forEach((marker:any )=> {
            this.addMarker(marker);
          }); */
  }

  addMarker(marker: Marker) {

        this.mapas=new google.maps.Marker({
              position: marker.position,
              map: this.map,
        });

        console.log(this.mapas);
        this.markers.push( this.mapas);
        console.log(this.markers)
        return  this.mapas
  }

  setMapOnAll(map:any) {

        for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(map);
        }
  }

  // Removes the markers from the map, but keeps them in the array.
  hideMarkers() {
        console.log('Entro a marakers')
        this.setMapOnAll(null);
  }

  location() {

          const location =Geolocation.watchPosition(this.geolocationOptions,(position) => {

            console.log('latitud' + position?.coords.latitude, 'longitud' + position?.coords.longitude);
            this.ubicacionEmpleadoLatitud = position?.coords.latitude;
            this.ubicacionEmpleadoLongitud = position?.coords.longitude;


            const marker={
              position: {
                lat: this.ubicacionEmpleadoLatitud,
                lng: this.ubicacionEmpleadoLongitud,

              },
              title: 'Parque Simón Bolivar'
            }
            this.addMarker(marker);
            this.calcularDistanciaEnMetros(this.ubicacionEmpleadoLatitud, this.ubicacionEmpleadoLongitud,-0.1670974,-78.4682521)
            location.finally()
          })



             /*  res=>{

                  console.log('latitud'+res.coords.latitude,'longitud'+ res.coords.longitude);
                  this.ubicacionEmpleadoLatitud=res.coords.latitude;
                  this.ubicacionEmpleadoLongitud=res.coords.longitude;
                  const marker={
                    position: {
                      lat: this.ubicacionEmpleadoLatitud,
                      lng: this.ubicacionEmpleadoLongitud,

                    },
                    title: 'Parque Simón Bolivar'
                  }
                  this.addMarker(marker);
                  this.calcularDistanciaEnMetros(this.ubicacionEmpleadoLatitud, this.ubicacionEmpleadoLongitud,-0.1670974,-78.4682521)

              } */

  }

  private calcularDistanciaEnMetros(lat1: number, lon1: number, lat2: number, lon2: number): number {

                  const R = 6371e3; // radio de la Tierra en metros
                  const φ1 = this.toRadians(lat1);
                  const φ2 = this.toRadians(lat2);
                  const Δφ = this.toRadians(lat2 - lat1);
                  const Δλ = this.toRadians(lon2 - lon1);
                  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                            Math.cos(φ1) * Math.cos(φ2) *
                            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
                  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                  console.log(R*c)
                  this.distancias=R*c;
                  return R * c;
  }

  private toRadians(degrees: number): number {
                 return degrees * (Math.PI / 180);
  }

  borrar(){
    console.log("borrar")
    console.log(this.mapas)
    this.mapas.setMapOnAll(null);
  }
  async presentAlert() {


          if(this.distancias<=25){

            const alert = await this.alertController.create({
              header: 'Alert',
              subHeader: 'Important message',
              message: 'INICIASTE TURNO',
              buttons: ['OK'],
            });

            await alert.present();
          }else{

            const alert = await this.alertController.create({
              header: 'Alert',
              subHeader: 'Important message',
              message: 'ACERCATE AL LUGAR',
              buttons: ['OK'],
            });

            await alert.present();

          }

  }

  submitForm(){

       const path='agencias'

       console.log(this.formRegister.value);

       const {nombreAgencia,latitud,longitud,supervisor,direccion}=this.formRegister.getRawValue();

       this.data.nombreAgencia=nombreAgencia,
       this.data.latitud=latitud,
       this.data.longitud=longitud,
       this.data.supervisor=supervisor,
       this.data.direccion=direccion
       this.data.idAgencia=this.firestore.CreaId()

      this.firestore.createDoc(this.data,path, this.data.idAgencia).then(
           res=>{

                const position= 'bottom';
                const message="Agencia guardada";
                this.interaction.presentToast(position,message);
                this.formRegister.reset();
           }
      )

  }


  getSupervisores(){
     const supervisores ='supervisores'
     this.firestore.getCollection(supervisores).subscribe(
           res=>{
                console.log(res);
                this.supervisores=res
           }
     )
  }



}
