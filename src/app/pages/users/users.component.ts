import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthHttp } from 'angular2-jwt';
import { MdSnackBar } from '@angular/material';
import { AppState } from '../../app.service';
import { handleErrorResponse } from '../../utils';

@Component({
  selector: 'profile',
  styleUrls: ['./users.component.scss'],
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  public userToClose?: string = null;

  constructor(
    public http: AuthHttp,
    public snackBar: MdSnackBar,
    private appState: AppState
  ) {}

  public ngOnInit() {
    this.http.get('/users')
      .map((res) => res.json())
      .subscribe((data) => {
        this.appState.set('users', data.users);
      }, handleErrorResponse(this.snackBar));
  }

  public pictureUrl(user) {
    return `url(${user.picture || this.appState.state.defaultPictureUrl})`;
  }

  public openDeleteDialog(userId: string) {
    this.userToClose = userId;
  }

  public dismissDeleteConfirm() {
    this.userToClose = null;
  }

  public deleteUser() {
    this.http.delete('/users/delete', { body: { id: this.userToClose } })
      .map((res) => res.json())
      .finally(() => {
        this.userToClose = null;
      })
      .subscribe((data) => {
        this.openSnackBar('Usuário deletado com sucesso!');
        this.ngOnInit();
      }, handleErrorResponse(this.snackBar));
  }

  public openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
