import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Preferences } from '../interfaces/preferences.interface';
import { PrefFormService } from '../services/pref-form.service';

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
    console.log(prefs);
    this.prefFormService.formChangedSubject.next(prefs);
  }

  resetForm(){
    this.preferencesForm.reset();
  }

  reverseGeocode(){

  }


}
