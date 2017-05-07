import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'forgot',
  styleUrls: ['./forgot-components.css'],
  templateUrl: './forgot.components.html'
})
export class ForgotComponent {

  public objt: any = {};
  constructor(
    public http: Http,
  ) {}

  public forgot() {
    this.http.post('/forgot', this.objt)
        .subscribe((data) => {
            console.log(data);
        }, (error) => {
          console.log(error);
        });
  }
}
