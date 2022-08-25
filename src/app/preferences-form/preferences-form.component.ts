import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Preferences } from '../interfaces/preferences.interface';

@Component({
  selector: 'app-preferences-form',
  templateUrl: './preferences-form.component.html',
  styleUrls: ['./preferences-form.component.scss']
})
export class PreferencesFormComponent implements OnInit {

  preferencesForm: FormGroup;
  lat: number;
  lng: number;

  constructor(
    private formBuilder: FormBuilder
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

  submit(form: FormGroup){
    const prefs: Preferences = {
      preferredRadius: form.value.preferredRadius,
      openNow: form.value.openNow
    }
    console.log(prefs);

  }

  resetForm(){
    //todo
  }

  reverseGeocode(){

  }


}
