import { Component } from '@angular/core';
import { AppState } from '../../app.service';

@Component({
  selector: 'default',
  styleUrls: [ './default-component.css' ],
  templateUrl: './default.component.html'
})
export class DefaultComponent {
  constructor(public appState: AppState) {}
}
