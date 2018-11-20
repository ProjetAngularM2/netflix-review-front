import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Movie, MovieSimple} from '../interfaces/movie';
import {MOVIES} from '../../../assets/data/movies';
import {environment} from '../../../environments/environment';
import {ɵMetadataOverrider} from '@angular/core/testing';
import {defaultIfEmpty, filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  // private property to store all backend URLs
  private readonly _backendURL: any;
  // url of the api for movies
  private _url: string;
  private _apiKey: string;
  private  MOVIES: string[];

  constructor(private _httpClient: HttpClient) {
    this._apiKey = 'apikey=57029d8c';
    this._url = 'http://www.omdbapi.com/?' + this._apiKey + '&plot=short&';
    this.MOVIES = MOVIES;

    this._backendURL = {};
    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints[ k ]}`);
  }


  /**
   * fetch a random movie from the omdbAPI
   */
  fetchRandomMovie(): Observable<Movie> {
    const rand = Math.round(Math.random() * this.MOVIES.length);
    return this._httpClient.get<Movie>(this._url + 'i=' + MOVIES[rand]);
  }

  /**
   * fetch the movie with the id in parameter from the omdbAPI
   */
  fetchMovie(id: string): Observable<Movie> {
    return this._httpClient.get<Movie>(this._url + 'i=' + id);
  }

  fetchMovieByName(name: string) {
    return this._httpClient.get<Movie>(this._url + 's=' + name);
  }

  fetchOne(id: string): Observable<Movie> {
    return this._httpClient.get<Movie>(this._backendURL.oneMovie.replace(':id', id));
  }

  fetchAllMovie(): Observable<Movie[]> {
    return this._httpClient.get<Movie[]>(this._backendURL.allMovies)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      );
  }

  update(movie: Movie): Observable<any> {
    return this._httpClient.put<Movie>(this._backendURL.updateMovie.replace(':id', movie.id), movie, this._options());
  }



  create(movie: Movie): Observable<any> {
    return this._httpClient.post<Movie>(this._backendURL.allMovies, movie, this._options());
  }

  delete(movie: Movie): Observable<any> {
    return this._httpClient.delete(this._backendURL.updateMovie.replace(':id', movie.id));
  }

  /**
   * Function to return request options
   */
  private _options(headerList: Object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
  }


  rate(subForm: any) {
    const rate = {Source: subForm.rate.User, Value: subForm.rate.Rate};
    if (subForm.m.Ratings == null) {
      subForm.m.Ratings = [rate];
    } else {
      subForm.m.Ratings.push(rate);
    }
    // TODO check user
    return this.update(subForm.m);
  }
}
