import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  data = [1,2,3,4,5,6,7];

  showAll = true;

  showDetail(){
    this.showAll = !this.showAll;
  }
}
