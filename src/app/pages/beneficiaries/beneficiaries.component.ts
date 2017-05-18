import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthHttp } from 'angular2-jwt';
import { MdSnackBar } from '@angular/material';
import { AppState } from '../../app.service';
import { handleErrorResponse } from '../../utils';
import { MdDialog, MdDialogRef } from '@angular/material';

import { DialogDeleteComponent } from './dialog.delete';

@Component({
  selector: 'beneficiaries',
  styleUrls: ['./beneficiaries-components.scss'],
  templateUrl: './beneficiaries.components.html'
})
export class BeneficiariesComponent implements OnInit {
  constructor(
    public http: AuthHttp,
    public snackBar: MdSnackBar,
    private appState: AppState,
    public dialog: MdDialog
  ) {}
  currentPerson: any = {};

  public ngOnInit() {
    this.http.get('/beneficiaries')
      .map((res) => res.json())
      .subscribe((data) => {
        this.appState.set('beneficiaries', data.beneficiaries);
      }, handleErrorResponse(this.snackBar));
  }

  public openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public delete(person) {
    this.http.delete('/beneficiaries/' + person.id)
      .map((res) => res.json())
      .subscribe((data) => {
        this.ngOnInit();
      }, handleErrorResponse(this.snackBar));
  }

  public openDialogDelete(person) {
    this.currentPerson = person;
    let dialogRef = this.dialog.open(DialogDeleteComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.delete(this.currentPerson);
      }
    });
  }
}
