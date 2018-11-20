import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Observable, of} from 'rxjs';
import {filter, flatMap} from 'rxjs/operators';
import { Router } from '@angular/router';
import {Movie} from '../interfaces/movie';
import {DialogMovieComponent} from '../dialog/movie/dialog.movie.component';
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: [ './card.component.css' ]
})
export class CardComponent implements OnInit {
  // private property to store movie value
  private _movie: Movie;


  /**
   * Component constructor
   */
  constructor() {
    this._movie = {} as Movie;
  }

  /**
   * Returns private property _movie
   */
  get movie(): Movie {
    return this._movie;
  }

  /**
   * Sets private property _movie
   */
  @Input()
  set movie(movie: Movie) {
    this._movie = movie;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
  }

}
