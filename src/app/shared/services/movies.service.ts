import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Movie} from '../interfaces/movie';
import {MOVIES} from '../../../assets/data/movies';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private _url: string;
  private _apiKey: string;
  private  MOVIES: string[];

  constructor(private _httpClient: HttpClient) {
    this._apiKey = 'apikey=57029d8c';
    this._url = 'http://www.omdbapi.com/?' + this._apiKey + '&plot=short&';
    this.MOVIES = MOVIES;
  }

  fetchRandomMovie(): Observable<Movie> {
    const rand = Math.round(Math.random() * this.MOVIES.length);
    return this._httpClient.get<Movie>(this._url + 'i=' + MOVIES[rand]);
  }
}
