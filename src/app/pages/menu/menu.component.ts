import { Component } from '@angular/core';
import { AppState } from '../../app.service';

const profileTransforms = 'c_fill,g_face,h_200,q_auto:best,r_max,w_200'
const defaultPictureUrl =
  `http://res.cloudinary.com/wagoid/image/upload/${profileTransforms}/empty-profile_h8q7mo.png`;

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

    return user && user.picture ? user.picture : defaultPictureUrl;
  }
}
