import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
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
  private _delete$: EventEmitter<Movie>;


  /**
   * Component constructor
   */
  constructor(private _router: Router) {
    this._movie = {} as Movie;
    this._delete$ = new EventEmitter<Movie>();
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
    this._router.navigate(['/edit', this._movie.id]);
  }

  addComment() {
    this._router.navigate(['/rate', this._movie.id]);
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
  }

  /**
   * Returns private property _delete$
   */
  @Output('deleteMovie') get delete$(): EventEmitter<Movie> {
    return this._delete$;
  }


  /**
   * Function to emit event to delete current movie
   */
  delete(movie: Movie) {
    this._delete$.emit(movie);
  }

}
