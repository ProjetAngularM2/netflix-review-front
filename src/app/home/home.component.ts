import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../shared/services/movies.service';
import {Movie} from '../shared/interfaces/movie';
import {MOVIES} from '../../assets/data/movies';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private _movies: Movie[];
  constructor(private _moviesServie: MoviesService ) {
    this._movies = [];
  }

  ngOnInit() {
    for (let i = 0 ; i < 20 ; i = i + 1) {
        this._moviesServie.fetchRandomMovie().subscribe((movie: Movie) => this._movies.push(movie));
    }
  }

  get movies(): Movie[] {
    return this._movies;
  }

}
