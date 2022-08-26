import { Component, Input, OnInit } from '@angular/core';

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
    this.refresh();
  }
  
  ngDoCheck(){
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
  }

}
