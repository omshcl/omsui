import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-geo',
  templateUrl: './geo.component.html',
  styleUrls: ['./geo.component.css']
})
export class GeoComponent implements OnInit {

  constructor() { }

  lng;
  lat;
  
  ngOnInit() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.longitude);
        this.lng = position.coords.longitude;
        this.lat = position.coords.latitude;
      });
    }
  }
}
