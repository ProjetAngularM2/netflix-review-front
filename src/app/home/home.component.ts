import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../shared/services/movies.service';
import {Movie} from '../shared/interfaces/movie';
import {MatDialog, MatDialogRef} from '@angular/material';
import {filter, flatMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {DialogMovieComponent} from '../shared/dialog/movie/dialog.movie.component';
import {Observable, of} from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private _movies: Movie[];

  private _moviesDialog: MatDialogRef<DialogMovieComponent>;


  constructor(private _moviesServie: MoviesService, private _router: Router, private _dialog: MatDialog) {
    this._movies = [];
  }

  ngOnInit() {
    for (let i = 0 ; i < 20 ; i = i + 1) {
        this._moviesServie.fetchRandomMovie().subscribe((movie: Movie) => movie === undefined ? undefined : this._movies.push(movie));
    }
  }

  get movies(): Movie[] {
    return this._movies;
  }

  /**
   * Function to navigate to current person
   */
  navigate(movie: Movie) {
    this._router.navigate([ '/movie', movie.imdbID ]);
  }

  /**
   * Function to display modal
   */
  showDialogAddMovie() {
    // set dialog status

    // open modal
    this._moviesDialog = this._dialog.open(DialogMovieComponent, {
      width: '500px',
      disableClose: true
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._moviesDialog.afterClosed()
      .pipe(
        filter(_ => !!_),
        flatMap(_ => this._add(_))
      )
      .subscribe(
        (_) => console.log(_));
  }

  /**
   * Add new movie
   */
  private _add(movie: any): Observable<Movie> {
    if (movie.Title === undefined) {
      console.log('Search');
      // todo requête serveur pour cherhcer le film via api en ligne puis ajouter à la base
    } else {
      console.log('Movie');
      // todo add movie
    }
    return of(movie);
  }



}
