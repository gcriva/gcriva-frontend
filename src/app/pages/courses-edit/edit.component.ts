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
  public editObjt: any = {};
  constructor(
    public http: AuthHttp,
    public snackBar: MdSnackBar,
    private appState: AppState,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.editObjt = this.appState.state.courses.filter((course) => {
        return course.id === params['id'];
      })[0];
    });
  }

  public save() {
    if (this.editObjt.id) {
      this.http.put('/courses/' + this.editObjt.id, this.editObjt)
        .subscribe((data) => {
            this.router.navigate(['cursos']);
          },
          handleErrorResponse(this.snackBar)
        );
    } else {
      this.http.post('/courses', this.editObjt)
        .subscribe((data) => {
            this.router.navigate(['cursos']);
          },
          handleErrorResponse(this.snackBar)
        );
    }
  }
}
