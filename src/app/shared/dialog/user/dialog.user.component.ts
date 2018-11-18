import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {User} from '../../interfaces/user';


@Component({
  selector: 'app-add-dialog',
  templateUrl: './dialog.user.component.html',
  styleUrls: [ './dialog.user.component.css' ]
})
export class DialogUserComponent implements OnInit {

  /**
   * Component constructor
   */
  constructor(private _dialogRef: MatDialogRef<DialogUserComponent>, @Inject(MAT_DIALOG_DATA) private _user: User) {
  }

  /**
   * Returns user passed in dialog open
   */
  get user(): User {
    return this._user;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
  }

  /**
   * Function to cancel the process and close the modal
   */
  onCancel() {
    this._dialogRef.close();
  }

  /**
   * Function to close the modal and send user to parent
   */
  onSave(user: User) {
    this._dialogRef.close(user);
  }
}
