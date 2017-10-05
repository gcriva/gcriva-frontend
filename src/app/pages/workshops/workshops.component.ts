import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthHttp } from 'angular2-jwt';
import { MdSnackBar } from '@angular/material';
import { AppState } from '../../app.service';
import { handleErrorResponse } from '../../utils';
import { MdDialog, MdDialogRef } from '@angular/material';

import { DialogDeleteComponent } from './workshops.delete';

@Component({
  selector: 'workshops',
  styleUrls: ['./workshops-components.scss'],
  templateUrl: './workshops.components.html'
})
export class WorkshopsComponent implements OnInit {
  public currentWorkshop: any = {};
  constructor(
    public http: AuthHttp,
    public snackBar: MdSnackBar,
    private appState: AppState,
    public dialog: MdDialog
  ) {}

  public ngOnInit() {
    this.http.get('/workshops')
      .map((res) => res.json())
      .subscribe((data) => {
        this.appState.set('workshops', data.workshops);
      }, handleErrorResponse(this.snackBar));
  }

  public openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public delete(project) {
    this.http.delete('/workshops/' + project._id)
      .map((res) => res.json())
      .subscribe((data) => {
        this.ngOnInit();
      }, handleErrorResponse(this.snackBar));
  }

  public openDialogDelete(project) {
    this.currentWorkshop = project;
    let dialogRef = this.dialog.open(DialogDeleteComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete(this.currentWorkshop);
      }
    });
  }
}
