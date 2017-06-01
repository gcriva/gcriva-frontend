import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'projects-delete',
  templateUrl: './projects-delete.html',
  styles: [`
    .label {
        display: inline-block;
        width: 100%;
        font-size: 18px;
        text-align: center;
        font-weight: bold;
    }

    .button {
        width: 49%;
    }
  `],
})
export class DialogDeleteComponent {

    constructor(public dialogRef: MdDialogRef<DialogDeleteComponent>) {}

    public delete() {
        this.dialogRef.close(true);
    }

    public cancel() {
        this.dialogRef.close();
    }
}
