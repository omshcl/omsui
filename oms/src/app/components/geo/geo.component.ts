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

    function displayLocationInfo(position) {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;
      console.log(`longitude: ${ lng } | latitude: ${ lat }`);
      return 0;
    }
    
    
  }

 

}
