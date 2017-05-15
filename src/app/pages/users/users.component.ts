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

  public openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
