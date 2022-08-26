import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'beer-run';

  barResults: string[];
  send(barResults: any){
    this.barResults = barResults;
  }
}
