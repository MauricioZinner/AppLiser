import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-detalle-solicitud-servicio',
  templateUrl: './detalle-solicitud-servicio.page.html',
  styleUrls: ['./detalle-solicitud-servicio.page.scss'],
})
export class DetalleSolicitudServicioPage implements OnInit {

  localization:any={
    lat: -0.15491733448221182,
     lng: -78.46955852743518
  };

  constructor() { }

  ngOnInit() {
  }

}
