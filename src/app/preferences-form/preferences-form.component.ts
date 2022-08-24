import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-preferences-form',
  templateUrl: './preferences-form.component.html',
  styleUrls: ['./preferences-form.component.scss']
})
export class PreferencesFormComponent implements OnInit {

  preferencesForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.preferencesForm = this.formBuilder.group({
      preferredRadius: this.formBuilder.control(null)
    })
   }

  ngOnInit(): void {
  }

}
