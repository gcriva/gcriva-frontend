import { Component } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { AuthHttp } from 'angular2-jwt';
import { MdSnackBar } from '@angular/material';
import { AppState } from '../../app.service';
import { handleErrorResponse } from '../../utils';
import { Router, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'workshops-edit',
  styleUrls: ['./edit-components.scss'],
  templateUrl: './edit.components.html'
})
export class EditWorkshopsComponent {
  public workshop: any = {};
  public selectedValue: any;

  constructor(
    public http: AuthHttp,
    public snackBar: MdSnackBar,
    private appState: AppState,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.http.get(`/workshops/${params.id}`)
          .map((res) => res.json())
          .subscribe(
            (data) => {
              this.workshop = data.workshop;
            },
            handleErrorResponse(this.snackBar)
          );
      }
    });
  }

  public save() {
    if (this.workshop._id) {
      this.http.put('/workshops/' + this.workshop._id, { workshop: this.workshop})
        .subscribe((data) => {
            this.router.navigate(['oficinas']);
          },
          handleErrorResponse(this.snackBar)
        );
    } else {
      this.http.post('/workshops', { workshop: this.workshop})
        .subscribe((data) => {
            this.router.navigate(['oficinas']);
          },
          handleErrorResponse(this.snackBar)
        );
    }
  }
}
