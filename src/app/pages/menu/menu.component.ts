import { Component, OnInit, ViewChild } from '@angular/core';
import { AppState } from '../../app.service';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { MdSidenav } from '@angular/material';

const profileTransforms = 'c_fill,g_face,h_200,q_auto:best,r_max,w_200';
const defaultPictureUrl =
  `http://res.cloudinary.com/wagoid/image/upload/${profileTransforms}/empty-profile_h8q7mo.png`;

@Component({
  selector: 'menu',
  styleUrls: ['./menu-components.scss'],
  templateUrl: './menu.components.html'
})
export class MenuComponent implements OnInit {
  public defaultPictureUrl: string = defaultPictureUrl;
  @ViewChild('sidenav') public sidenav: MdSidenav;

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    public appState: AppState
  ) {
    this.appState.set('defaultPictureUrl', this.defaultPictureUrl);
  }

  public ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.sidenav.close();
      }
    });
  }

  public isAdmin() {
    return this.appState.state.user.roles && this.appState.state.user.roles.indexOf('admin') !== -1;
  }

  public toProjects() {
    console.log('to projects');
  }

  public toParents() {
    console.log('to parents');
  }

  public tostudents() {
    console.log('to students');
  }

  public logout() {
    localStorage.setItem('token', null);
    this.router.navigate(['login']);
  }

  public editProfile() {
    this.router.navigate(['/perfil']);
  }
}
