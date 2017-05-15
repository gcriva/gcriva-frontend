import { Component } from '@angular/core';
import { AppState } from '../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MdSidenav } from '@angular/material';

const profileTransforms = 'c_fill,g_face,h_200,q_auto:best,r_max,w_200';
const defaultPictureUrl =
  `http://res.cloudinary.com/wagoid/image/upload/${profileTransforms}/empty-profile_h8q7mo.png`;

@Component({
  selector: 'menu',
  styleUrls: ['./menu-components.scss'],
  templateUrl: './menu.components.html'
})
export class MenuComponent {
  public defaultPictureUrl: String = defaultPictureUrl;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public appState: AppState
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

  public user() {
    return this.appState.state.user || {};
  }

  public logout(sidenav: MdSidenav) {
    sidenav.close();
    localStorage.setItem('token', null);
    this.router.navigate(['login']);
  }

  public editProfile(sidenav: MdSidenav) {
    sidenav.close();
    this.router.navigate(['/profile']);
  }
}
