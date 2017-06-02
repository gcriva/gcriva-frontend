import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthHttp } from 'angular2-jwt';
import { MdSnackBar } from '@angular/material';
import { AppState } from '../../app.service';
import { handleErrorResponse } from '../../utils';
import { MdDialog, MdDialogRef } from '@angular/material';

import { DialogDeleteComponent } from './courses.delete';

@Component({
  selector: 'courses',
  styleUrls: ['./courses-components.scss'],
  templateUrl: './courses.components.html'
})
export class CoursesComponent implements OnInit {
  public currentCourses: any = {};
  constructor(
    public http: AuthHttp,
    public snackBar: MdSnackBar,
    private appState: AppState,
    public dialog: MdDialog
  ) {}

  public ngOnInit() {
    this.http.get('/courses')
      .map((res) => res.json())
      .subscribe((data) => {
        this.appState.set('courses', data.course);
      }, handleErrorResponse(this.snackBar));
  }

  public openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public delete(project) {
    this.http.delete('/courses/' + project.id)
      .map((res) => res.json())
      .subscribe((data) => {
        this.ngOnInit();
      }, handleErrorResponse(this.snackBar));
  }

  public openDialogDelete(project) {
    this.currentCourses = project;
    let dialogRef = this.dialog.open(DialogDeleteComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete(this.currentCourses);
      }
    });
  }
}
