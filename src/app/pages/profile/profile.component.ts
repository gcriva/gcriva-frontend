import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthHttp } from 'angular2-jwt';
import { MdSnackBar } from '@angular/material';
import { AppState } from '../../app.service';
import { handleErrorResponse } from '../../utils';

interface Password {
  currentPassword?: string;
  password?: string;
  confirmPassword?: string;
}

@Component({
  selector: 'profile',
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  public user: object = {};
  public password: Password = {};

  constructor(
    public http: AuthHttp,
    public snackBar: MdSnackBar,
    private appState: AppState
  ) {}

  public ngOnInit() {
    const stateUser = this.appState.state.user;

    this.user = { name: stateUser.name, email: stateUser.email, picture: stateUser.picture };
  }

  public updateProfile() {
    this.http.post('/account', { user: this.user })
      .map((res) => res.json())
      .subscribe((data) => {
        this.appState.set('user', data.user);
        localStorage.setItem('token', data.token);
        this.openSnackBar('Informações salvas com sucesso!!', 'OK');
      }, handleErrorResponse(this.snackBar));
  }

  public updatePassword(form: NgForm) {
    const password = form.value;

    if (password.password !== password.confirmPassword) {
      this.openSnackBar('A confirmação de senha deve ser igual à nova senha', 'OK');
    } else {
      this.http.post('/account/password', password)
        .map((res) => res.json())
        .subscribe((data) => {
          this.openSnackBar(data.message);
        }, handleErrorResponse(this.snackBar));
    }
  }

  public uploadNewPicture(event) {
    const [file] = event.srcElement.files;
    if (file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg') {
      this.openSnackBar('Favor selecionar uma imagem que tenha o formato JPG ou PNG', 'OK');
    } else {
      const formData = new FormData();
      formData.append('picture', file);
      this.http.post('/account/image', formData)
        .map((res) => res.json())
        .subscribe((data) => {
          this.appState.set('user', {
            ...this.appState.state.user,
            picture: data.picture
          });
          (<any> this.user).picture = data.picture;
          localStorage.setItem('token', data.token);
          this.openSnackBar('Foto de perfil alterada com sucesso!', 'OK');
        }, handleErrorResponse(this.snackBar));
    }
  }

  public openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
