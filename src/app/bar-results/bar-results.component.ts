import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PrefFormService } from '../services/pref-form.service';

@Component({
  selector: 'app-bar-results',
  templateUrl: './bar-results.component.html',
  styleUrls: ['./bar-results.component.scss']
})
export class BarResultsComponent implements OnInit {
  
  @Input() barResults: string[];
  bars: string[];
  showContainer = false;

  constructor(
  ) { }

  ngOnInit(): void {
    console.log(this.barResults);
    this.refresh();
  }
  
  ngDoCheck(){
    console.log(this.barResults);
    this.refresh();
  }

  refresh(){
    this.bars = [];
    this.bars = this.barResults;
    if (this.barResults?.length > 0){
      this.showContainer = true;
    } else {
      this.showContainer = false;
    }
    console.log(this.bars);
  }

}
