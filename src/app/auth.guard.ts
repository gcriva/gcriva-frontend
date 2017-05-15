import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { AppState } from './app.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private appState: AppState) {}

  public canActivate(route: ActivatedRouteSnapshot) {
    const token = localStorage.getItem('token');
    const jwtHelper = new JwtHelper();

    let tokenIsExpired = false;

    try {
      tokenIsExpired = jwtHelper.isTokenExpired(token);
    } catch (e) {
      tokenIsExpired = true;
    }

    if (tokenIsExpired) {
      this.router.navigateByUrl('/login');
      return false;
    }

    this.appState.set('user', jwtHelper.decodeToken(token));

    const { firstChild } = route;
    if (firstChild && firstChild.data && firstChild.data.role) {
      const { role } = firstChild.data;

      if (this.appState.state.user.roles.indexOf(role) === -1) {
        this.router.navigateByUrl('/home');
        return false;
      }
    }

    return true;
  }
}
