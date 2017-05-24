import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthHttp } from 'angular2-jwt';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AppState } from '../../../app.service';
import { handleErrorResponse } from '../../../utils';

@Component({
  selector: 'profile',
  styleUrls: ['./new.component.scss'],
  templateUrl: './new.component.html'
})
export class NewUserComponent {
  public user: any = {};
  public roles: any = {};

  constructor(
    public http: AuthHttp,
    public snackBar: MdSnackBar,
    private appState: AppState,
    private router: Router,
  ) {}

  public createUser() {
    const roles = Object.keys(this.roles).filter((role) => this.roles[role]);

    if (!roles.length) {
      return this.openSnackBar('Favor selecionar pelo menos um tipo de usuário', 'OK');
    }
    this.user.roles = roles;

    this.http.post('/signup', this.user)
      .map((res) => res.json())
      .subscribe((data) => {
        this.openSnackBar('Usuário criado com sucesso!');
        this.router.navigateByUrl('/usuarios');
      }, handleErrorResponse(this.snackBar));
  }

  public openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
