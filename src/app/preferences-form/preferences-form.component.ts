import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Preferences } from '../interfaces/preferences.interface';
import { MapComponent } from '../map/map.component';
import { PrefFormService } from '../services/pref-form.service';

@Component({
  selector: 'app-preferences-form',
  templateUrl: './preferences-form.component.html',
  styleUrls: ['./preferences-form.component.scss']
})
export class PreferencesFormComponent implements OnInit {
  /* TODO: (need to prioritize)
      -add slider to form
      -make mobile friendly (map specifically)
      -font is bad
      -colors could be rearranged
      -change color of markers
      -change map style
      -replace scss default theme
      -give labels to form controls
      -remove markers on clear
      -zoom out?
      -change color of radius
      -make global styles
      -make github private (API key public is not a production solution)
      -make function of geolocation service call
      -add window for markers
      -clean up nearby search call
      -reverse geocode lat and lng to readble address
      -create reducer for form values
  */


  preferencesForm: FormGroup;
  lat: number;
  lng: number;

  constructor(
    private formBuilder: FormBuilder,
    private prefFormService: PrefFormService
  ) {
    this.preferencesForm = this.formBuilder.group({
      preferredRadius: this.formBuilder.control("", Validators.pattern("^[0-9]*$")),
      openNow: this.formBuilder.control(false)
    })
   }

  ngOnInit(): void {
    this.getUserCurrentLocation();
  }

  getUserCurrentLocation(){
    // figure out a way to stop calling getCurrentPosition service a million times
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    } else {
      console.log("User Not Allowed")
    }
  }

  submit(form: FormGroup, event: Event){
    const prefs: Preferences = {
      preferredRadius: form.value.preferredRadius,
      openNow: form.value.openNow
    }
    this.prefFormService.formChangedSubject.next(prefs);
  }

  resetForm(){
    this.preferencesForm.reset();
  }

  reverseGeocode(){

  }


}


