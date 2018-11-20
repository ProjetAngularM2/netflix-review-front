import { Component, OnInit } from '@angular/core';
import {Movie} from '../shared/interfaces/movie';
import {MoviesService} from '../shared/services/movies.service';
import {ActivatedRoute} from '@angular/router';
import {merge} from 'rxjs';
import {filter, flatMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  private _movie: Movie;

  constructor(private _movieService: MoviesService, private _route: ActivatedRoute) {
    this._movie = {} as Movie;
  }

  ngOnInit() {
    merge(
      this._route.params.pipe(
        filter(params => !!params['id']),
        flatMap(params => this._movieService.fetchOne(params['id']))
      ),
      this._route.params.pipe(
        filter(params => !params['id']),
        flatMap(_ => this._movieService.fetchRandomMovie())
      )
    )
      .subscribe((movie: Movie) => this._movie = movie);
  }

  get movie(): Movie {
    return this._movie;
  }



}
