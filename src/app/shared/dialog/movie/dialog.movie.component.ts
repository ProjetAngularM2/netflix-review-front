import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {Movie} from '../../interfaces/movie';


@Component({
  selector: 'app-add-dialog',
  templateUrl: './dialog.movie.component.html',
  styleUrls: [ './dialog.movie.component.css' ]
})
export class DialogMovieComponent implements OnInit {


  /**
   * Component constructor
   */
  constructor(private _dialogRef: MatDialogRef<DialogMovieComponent>, @Inject(MAT_DIALOG_DATA) private _movie: Movie) {
  }

  /**
   * Returns user passed in dialog open
   */
  get movie(): Movie {
    return this._movie;
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
   * Function to close the modal and send movie to parent
   */
  onSave(movie: Movie) {
    this._dialogRef.close(movie);
  }

  /**
   * Function to close the modal and send movie to parent
   */
  onSearch(title: string) {
    this._dialogRef.close(title);
  }
}
