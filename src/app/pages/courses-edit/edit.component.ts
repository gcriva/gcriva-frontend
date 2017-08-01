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
  selector: 'courses-edit',
  styleUrls: ['./edit-components.scss'],
  templateUrl: './edit.components.html'
})
export class EditCoursesComponent {
  public course: any = {
    beneficiaries: []
  };
  public beneficiaries: any[] = [];
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
        this.http.get(`/courses/${params.id}`)
          .map((res) => res.json())
          .subscribe(
            (data) => {
              this.course = data.course;
            },
            handleErrorResponse(this.snackBar)
          );
      }
    });

    this.http.get('/beneficiaries')
      .map((res) => res.json())
      .subscribe(
        (data) => {
          this.beneficiaries = data.beneficiaries;
        },
        handleErrorResponse(this.snackBar)
      );

  }

  public pushBeneficiarie() {
    this.course.beneficiaries = this.selectedValue;
  }

  public save() {
    if (this.course._id) {
      this.http.put('/courses/' + this.course._id, { course: this.course})
        .subscribe((data) => {
            this.router.navigate(['cursos']);
          },
          handleErrorResponse(this.snackBar)
        );
    } else {
      this.http.post('/courses', { course: this.course})
        .subscribe((data) => {
            this.router.navigate(['cursos']);
          },
          handleErrorResponse(this.snackBar)
        );
    }
  }
}
