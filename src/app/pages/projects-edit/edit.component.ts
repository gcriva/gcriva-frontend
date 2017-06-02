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
  selector: 'projects-edit',
  styleUrls: ['./edit-components.scss'],
  templateUrl: './edit.components.html'
})
export class EditProjectsComponent {
  public project: any = {};
  constructor(
    public http: AuthHttp,
    public snackBar: MdSnackBar,
    private appState: AppState,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.http.get(`/projects/${params.id}`)
          .map((res) => res.json())
          .subscribe(
            (data) => {
              this.project = data.project;
            },
            handleErrorResponse(this.snackBar)
          );
      }
    });
  }

  public save() {
    if (this.project.id) {
      this.http.put('/projects/' + this.project.id, { project: this.project })
        .subscribe((data) => {
            this.router.navigate(['projetos']);
          },
          handleErrorResponse(this.snackBar)
        );
    } else {
      this.http.post('/projects', { project: this.project })
        .subscribe((data) => {
            this.router.navigate(['projetos']);
          },
          handleErrorResponse(this.snackBar)
        );
    }
  }
}
