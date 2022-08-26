import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';
import { Subscription } from 'rxjs';
import { Preferences } from '../interfaces/preferences.interface';
import { SearchResponse } from '../interfaces/search.response.interface';
import { PrefFormService } from '../services/pref-form.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;

  @Output() emitter: EventEmitter<string[]> = new EventEmitter<string[]>();

  /** GEOCODE VARIABLES */
  center: google.maps.LatLngLiteral;
  lat: number;
  lng: number;

  /** CURRENT LOCATION VARIABLES */
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    animation: google.maps.Animation.DROP,
    icon: "assets/yellow-marker.png"
  };
  mapZoom = 8;
  mapCenter: google.maps.LatLng;
  mapOptions: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true
  };
  radius = 0;
  metersToMilesMultiplier = 1609.34;

  /** BAR RESULTS VARIABLES */
  markers: google.maps.LatLng[];
  barMarkerOptions: google.maps.MarkerOptions = {
    icon: "assets/bar-icon.png"
  }
  barNames: string[] = [];
  emptyBar: string[] = [];

  /** FORM VARIABLES */
  formChanged: Subscription;

  constructor(
    private prefFormService: PrefFormService
  ) { }

  ngOnInit() {
    // THIS PANS MAP TO CURRENT LOCATION, DOES NOT ADD MARKER
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });

    this.formChanged = this.prefFormService.formChangedSubject.subscribe((formVals: Preferences) => {
      if (formVals.preferredRadius === null) {
        this.resetMarkers();
        this.emptyBar = []
        this.emitBarResultsChange(this.emptyBar);
      }
      //was throwing error so I had to make it a string then parse
      this.radius = parseFloat(formVals.preferredRadius * this.metersToMilesMultiplier + "");
      formVals.openNow;
      this.getNearbyBar(this.radius, formVals.openNow, this.center);
    });
    this.resetMarkers();
  }

  ngAfterViewInit() {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {

        const point: google.maps.LatLngLiteral = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        this.mapCenter = new google.maps.LatLng(point);
        this.map.panTo(point);
      },
      (error) => {
        console.log("Could Not Find User Location ");
      },
      { enableHighAccuracy: true }
    );
  }

  getNearbyBar(radius: number, openNow: boolean, center: any) {
    let latty = center.lat.toString();
    let longy = center.lng.toString();

    const happyUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyCbOt9xUH2lyaTEKjdDOVK0BJ1dROGVxPY&location=" + latty + "," + longy + "&radius=" + radius + "&type=bar";
    let URL = openNow ? happyUrl + "&opennow" : happyUrl;
    console.log(URL);
    fetch(URL).then(data => {
      return data.json()
    }).then(jsonData => {
      this.createMarkersFromJson(jsonData.results);
      console.log(jsonData.results);
    }).catch(error => {
      console.log(error);
    })
  }

  createMarkersFromJson(results: SearchResponse[]) {
    /** CONVERTING RESULTS FROM NEARBY SEARCH TO ARRAY OF COORDINATES */
    results.map(obj => {
      const point: google.maps.LatLngLiteral = {
        lat: obj.geometry.location.lat,
        lng: obj.geometry.location.lng
      };
      const name = obj.name.toString();
      const currentPoint = new google.maps.LatLng(point);
      this.markers.push(currentPoint);
      this.barNames.push(name);
    });
    /** SEND NAMES TO BAR RESULTS COMPONENT */
    this.emitBarResultsChange(this.barNames);
  }

  resetMarkers() {
    this.markers = [];
    this.barNames = [];
  }

  emitBarResultsChange(barNames: string[] | undefined) {
    this.emitter.emit(barNames);
  }

}
