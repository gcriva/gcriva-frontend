import { Component } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { ApiHttp } from '../../api-http.service';

@Component({
  selector: 'forgot',
  styleUrls: ['./forgot-components.scss'],
  templateUrl: './forgot.components.html'
})
export class ForgotComponent {

  public objt: any = {};
  constructor(
    public http: ApiHttp,
    public snackBar: MdSnackBar
  ) {}

  public forgot() {
    this.http.post('/forgot', this.objt)
      .map((res) => res.json())
      .subscribe((data) => {
        this.snackBar.open(data.message, null, { duration: 5000 });
      }, (errorResponse) => {
        const error = errorResponse.json();

        this.snackBar.open(error.message ? error.message : error.messages[0], null, {
          duration: 1500
        });
      });
  }
}
