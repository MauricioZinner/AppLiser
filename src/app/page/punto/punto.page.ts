import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-punto',
  templateUrl: './punto.page.html',
  styleUrls: ['./punto.page.scss'],
})
export class PuntoPage implements OnInit {

  constructor() { }

  localization:any={
     lat: -0.15491733448221182,
     lng: -77.46955852743518
  };

  ngOnInit() {

  }

}
