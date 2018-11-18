import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../shared/services/movies.service';
import {Movie} from '../shared/interfaces/movie';
import {MatDialog, MatDialogRef} from '@angular/material';
import {DialogUserComponent} from '../shared/dialog/user/dialog.user.component';
import {filter, flatMap} from 'rxjs/operators';
import {User} from '../shared/interfaces/user';
import {Observable, of} from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private _movies: Movie[];


  constructor(private _moviesServie: MoviesService) {
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
