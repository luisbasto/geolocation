import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  watchId: any;
  lat: any;
  lng: any;
  acc: any;
  
  constructor() { }

  ngOnInit() { 
    this.locate().catch(e => {
      console.log('There has been a problem with your geolocation: ' + e.message);
    });
    this.track();
  }
  
    async locate() {
      const coordinates = await Geolocation.getCurrentPosition();
      this.lat = coordinates.coords.latitude;
      this.lng = coordinates.coords.longitude;
      this.acc = coordinates.coords.accuracy;
    }

    async track() {
      this.watchId = await Geolocation.watchPosition({timeout:2000, enableHighAccuracy:true}, (position, err) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.acc = position.coords.accuracy;
      })
    }
}
