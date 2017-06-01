import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthHttp } from 'angular2-jwt';
import { MdSnackBar } from '@angular/material';
import { AppState } from '../../app.service';
import { handleErrorResponse } from '../../utils';
import { MdDialog, MdDialogRef } from '@angular/material';

import { DialogDeleteComponent } from './projects.delete';

@Component({
  selector: 'projects',
  styleUrls: ['./projects-components.scss'],
  templateUrl: './projects.components.html'
})
export class ProjectsComponent implements OnInit {
  public currentProject: any = {};
  constructor(
    public http: AuthHttp,
    public snackBar: MdSnackBar,
    private appState: AppState,
    public dialog: MdDialog
  ) {}

  public ngOnInit() {
    this.http.get('/projects')
      .map((res) => res.json())
      .subscribe((data) => {
        this.appState.set('projects', data.projects);
      }, handleErrorResponse(this.snackBar));
  }

  public openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public delete(project) {
    this.http.delete('/projects/' + project.id)
      .map((res) => res.json())
      .subscribe((data) => {
        this.ngOnInit();
      }, handleErrorResponse(this.snackBar));
  }

  public openDialogDelete(project) {
    this.currentProject = project;
    let dialogRef = this.dialog.open(DialogDeleteComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete(this.currentProject);
      }
    });
  }
}
