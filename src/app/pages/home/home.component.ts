import { Component } from '@angular/core';

import { AppState } from '../../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';

@Component({
  selector: 'home',
  providers: [
    Title
  ],
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(
    public appState: AppState,
    public title: Title
  ) {}

}
