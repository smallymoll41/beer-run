import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GoogleMap } from '@angular/google-maps';
import { Subscription } from 'rxjs';
import { Preferences } from '../interfaces/preferences.interface';
import { PreferencesFormComponent } from '../preferences-form/preferences-form.component';
import { PrefFormService } from '../services/pref-form.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;

  center: google.maps.LatLngLiteral;
  markers = [] as any;
  lat: number;
  lng: number;

  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
  };

  mapZoom = 12;
  mapCenter: google.maps.LatLng;
  mapOptions: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 4
  };

  markerInfoContent = 'You Are Here!';

  formChanged: Subscription;
  radius = 0;

  constructor(
    private prefFormService: PrefFormService
  ) { }

  ngOnInit() {

    // upon landing, center map on user's current location
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });

    this.formChanged = this.prefFormService.formChangedSubject.subscribe((formVals: Preferences) => {
      this.radius = parseFloat(formVals.preferredRadius + "");
      formVals.openNow;
      this.getNearbyBar(this.radius, formVals.openNow, this.center);
    });
  }

  ngAfterViewInit() {
    // have this here for now because some values were undefined when loaded on init
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    //use current position to create marker
    //may look for alternative option since this is kinda repetitive 
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {

        const point: google.maps.LatLngLiteral = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        this.mapCenter = new google.maps.LatLng(point);
        this.map.panTo(point);

        this.markerOptions = {
          draggable: false,
          animation: google.maps.Animation.DROP,
        };
      },
      (error) => {
        //add actual error message
      },
      { enableHighAccuracy: true }
    );
  }

  getNearbyBar(radius: number, openNow: boolean, center:any) {

    let latty = center.lat.toString();
    let longy = center.lng.toString();

    const happyUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyCbOt9xUH2lyaTEKjdDOVK0BJ1dROGVxPY&location=" + latty + "," + longy + "&radius=" + radius + "&type=bar";
    if (openNow) {
      const URL = happyUrl + "&openNow=true";

      fetch(URL).then(data => {
        return data.json()
      }).then(jsonData => {
        console.log(jsonData.results)
      }).catch(error => {
        console.log(error);
      })
    } else {
      const URL = happyUrl;

      fetch(URL).then(data => {
        return data.json()
      }).then(jsonData => {
        console.log(jsonData.results)
      }).catch(error => {
        console.log(error);
      })
    }

  }

}
