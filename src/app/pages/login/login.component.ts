import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { JwtHelper } from 'angular2-jwt';
import { AppState } from '../../app.service';
import { ApiHttp } from '../../api-http.service';
import { Meta } from '@angular/platform-browser';

const jwtHelper = new JwtHelper();

@Component({
  selector: 'login',
  styleUrls: ['./login-components.scss'],
  templateUrl: './login.components.html'
})
export class LoginComponent implements OnInit {

  public localState: any;
  public loginData: any = {};

  constructor(
    public route: ActivatedRoute,
    public http: ApiHttp,
    public snackBar: MdSnackBar,
    public router: Router,
    public appState: AppState,
    private meta: Meta
  ) {
    this.meta.addTag({ property: 'og:title', content: 'Oia nois ae bruxão!' });
    this.meta.addTag({
      property: 'og:description',
      content: 'Aqui é pra quem é doido e usa meta nos angular!'
    });
    this.meta.addTag({
      property: 'og:image',
      // tslint:disable-next-line:max-line-length
      content: 'http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg'
    });
  }

  public login() {
    this.http.post('/login', this.loginData)
      .map((res) => res.json())
      .subscribe((data) => {
          localStorage.setItem('token', data.token);
          this.router.navigateByUrl('/home');

          this.appState.set('user', jwtHelper.decodeToken(data.token));
      }, (error) => {
        this.openSnackBar(error.json().message || 'Não foi possível conectar ao servidor', 'OK');
      });
  }

  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public ngOnInit() {
    const token = localStorage.getItem('token');
    let tokenIsExpired = false;

    try {
      tokenIsExpired = jwtHelper.isTokenExpired(token);
    } catch (e) {
      tokenIsExpired = true;
    }

    if (!tokenIsExpired) {
      this.router.navigateByUrl('/home');
    }
  }

}
