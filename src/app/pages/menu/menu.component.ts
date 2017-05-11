import { Component } from '@angular/core';
import { AppState } from '../../app.service';

@Component({
  selector: 'menu',
  styleUrls: ['./menu-components.scss'],
  templateUrl: './menu.components.html'
})
export class MenuComponent {
  constructor(
    private appState: AppState
  ) {}

  public toProjects() {
    console.log('to projects');
  }

  public toParents() {
    console.log('to parents');
  }

  public tostudents() {
    console.log('to students');
  }

  public picture() {
    const user = this.appState.get('user');

    return user && user.picture ? user.picture : '';
  }
}
