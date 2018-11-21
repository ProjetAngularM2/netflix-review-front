import {Component, OnInit} from '@angular/core';
import {MoviesService} from '../shared/services/movies.service';
import {Movie, MovieSimple} from '../shared/interfaces/movie';
import {MatDialog, MatDialogRef} from '@angular/material';
import {filter, flatMap, map} from 'rxjs/operators';
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
    /**
     for (let i = 0 ; i < 20 ; i = i + 1) {
        this._moviesServie.fetchRandomMovie().subscribe((movie: Movie) => movie === undefined ? undefined : this._movies.push(movie));
    }
     */
    this._moviesServie.fetchAllMovie().subscribe((movies: Movie[]) => this._movies = movies);
  }

  get movies(): Movie[] {
    return this._movies;
  }

  /**
   * Function to navigate to current person
   */
  navigate(movie: Movie) {
    this._router.navigate(['/movie', movie.id]);
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
        (movies: Movie[]) => this._movies = movies);
  }

  /**
   * Add new movie
   */
  private _add(movie: any): Observable<Movie[]> {
     movie.id = '0';
    if (movie.Title === undefined) {
      return this._moviesServie.fetchMovieByName(movie.search)
        .pipe(
          flatMap((m: any) => m.Response === 'True' ? this._moviesServie.fetchMovie(m.Search[0].imdbID) : of(undefined)),
          flatMap((m: any) => this._changeField(m))
        );
    } else {
      return this._moviesServie
        .create(movie)
        .pipe(
          flatMap(_ => this._moviesServie.fetchAllMovie())
        );
    }
  }

  private _changeField(movie: any): Observable<Movie[]> {
    if (movie === undefined) {
      return this._moviesServie.fetchAllMovie();
    } else {
      const res = {
        'Title': movie.Title,
        'Year': movie.Year,
        'Plot': movie.Plot,
        'Poster': movie.Poster,
        'Genre': movie.Genre,
        'Metascore': movie.Metascore
      };
      return this._add(res);
    }
  }


}
