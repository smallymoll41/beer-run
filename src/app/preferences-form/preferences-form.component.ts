import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
      preferredRadius: this.formBuilder.control(null),
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
    //fix this 
    //fix validators
  }

  resetForm(){
    //todo
  }

}
