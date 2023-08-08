import { Component, Input, OnInit } from '@angular/core';
import { Marker } from 'src/app/models/models';
import { Geolocation } from '@capacitor/geolocation';
import { AlertController } from '@ionic/angular';

declare var google:any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent  implements OnInit {

  map = null;
  mapEle:any
  @Input() localizar:any=[];

  constructor() {

      console.log(this.localizar)
  }

  ngOnInit() {

        this.loadMap();
        console.log('1 entro a maps componente')
  }

  loadMap() {
        // create a new map by passing HTMLElement
        const mapEle: HTMLElement|null = document.getElementById('map');
        // create LatLng object

      // const myLatLng = {lat: -0.15491733448221182, lng: -78.46955852743518};
      const myLatLng  = this.localizar;
      console.log('myLatLng 2',myLatLng )
        // create map
        this.map = new google.maps.Map(mapEle, {
          center: this.localizar,
          zoom: 12
        });

        google.maps.event.addListenerOnce(this.map, 'idle', () => {

          mapEle!.classList.add('show-map');
          //this.addMarker(this.localizar)
          console.log('entro al idle 3')
          this.renderMarker()
        });
  }
  renderMarker(){

    this.localizar.forEach((element:any) => {

      this.addMarker(element)
    });
  }
  addMarker(marker:any) {

          console.log('4 ',marker)
          return new google.maps.Marker({
            position: marker,
            map: this.map,
          });

  }

}
