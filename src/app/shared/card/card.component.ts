import { Component, OnInit, Input } from '@angular/core';
import {Movie} from '../interfaces/movie';
import {Router} from '@angular/router';

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
  constructor(private _router: Router) {
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

  navigate() {
    this._router.navigate(['/movie', this._movie.imdbID]);
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
  }

}
