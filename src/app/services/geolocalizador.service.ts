import { Injectable } from '@angular/core';
import { ClearWatchOptions, Geolocation } from '@capacitor/geolocation';
import { Observable, Subscription, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocalizadorService {

  ubicacionEmpleadoLatitud: any;
  ubicacionEmpleadoLongitud: any;


  geolocationOptions:any = {
    //enableHighAccuracy: true, // Precisión alta para mejorar la exactitud (opcional)
    // Tiempo de espera máximo para obtener la ubicación en milisegundos (opcional)
  };

  locationSubscription: any;


  constructor() { }





/* location(): Observable<any> {

    return new Observable((observer:any) => {

      this.locationSubscription = Geolocation.watchPosition(this.geolocationOptions, (position) => {
        console.log('latitud' + position?.coords.latitude, 'longitud' + position?.coords.longitude);
        this.ubicacionEmpleadoLatitud = position?.coords.latitude;
        this.ubicacionEmpleadoLongitud = position?.coords.longitude;

        const marker = {
            lat: this.ubicacionEmpleadoLatitud,
            lng: this.ubicacionEmpleadoLongitud,
        };

        console.log(marker)

        observer.next(marker);
        // Emite el objeto marker
        //this.locationSubscription.unsubscribe();
        // Detener el seguimiento después de obtener la ubicación
        //observer.complete(); // Completa el observable
        this.stopTrack()
      });

    });
} */

 /*  clearWatch() {

    if (this.locationSubscription != null) {
      console.log('ingreso a clearWatch')
      Geolocation.clearWatch({ id: this.locationSubscription });
    }
  } */

async stopTrack() {

          console.log('this.wait=',this.locationSubscription);

          const opt: ClearWatchOptions = {id: await this.locationSubscription};

          Geolocation.clearWatch(opt).then(result=>{

            console.log('result of clear is',result);
          });
}


async location() {

  const data= Geolocation.getCurrentPosition();
  console.log(data);
  return await Geolocation.getCurrentPosition();

};








}

