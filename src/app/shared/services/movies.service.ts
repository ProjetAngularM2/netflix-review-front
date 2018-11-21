import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Movie, MovieSimple} from '../interfaces/movie';
import {MOVIES} from '../../../assets/data/movies';
import {environment} from '../../../environments/environment';
import {ɵMetadataOverrider} from '@angular/core/testing';
import {defaultIfEmpty, filter, map} from 'rxjs/operators';
import {User} from '../interfaces/user';
import {UsersService} from './users.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  // private property to store all backend URLs
  private readonly _backendURL: any;
  // url of the api for movies
  private _url: string;
  private _apiKey: string;
  private MOVIES: string[];

  constructor(private _httpClient: HttpClient, private _usersServcie: UsersService) {
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
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`);
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

  /**
   * fetch the movie with the name in parameter from the omdbAPI
   */
  fetchMovieByName(name: string) {
    return this._httpClient.get<Movie>(this._url + 's=' + name);
  }

  /**
   * fetch the movie with the id in parameter from the BDD (Backend)
   */
  fetchOne(id: string): Observable<Movie> {
    return this._httpClient.get<Movie>(this._backendURL.oneMovie.replace(':id', id));
  }

  /**
   * fetch all movies from the BDD (Backend)
   */
  fetchAllMovie(): Observable<Movie[]> {
    return this._httpClient.get<Movie[]>(this._backendURL.allMovies)
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      );
  }

  /**
   * update movie with the movie in parameter
   */
  update(movie: Movie): Observable<any> {
    return this._httpClient.put<Movie>(this._backendURL.updateMovie.replace(':id', movie.id), movie, this._options());
  }

  /**
   * create movie into the BDD
   */
  create(movie: Movie): Observable<any> {
    return this._httpClient.post<Movie>(this._backendURL.allMovies, movie, this._options());
  }

  /**
   * delete movie into the BDD
   */
  delete(movie: Movie): Observable<any> {
    return this._httpClient.delete(this._backendURL.updateMovie.replace(':id', movie.id));
  }

  /**
   * Function to return request options
   */
  private _options(headerList: Object = {}): any {
    return {headers: new HttpHeaders(Object.assign({'Content-Type': 'application/json'}, headerList))};
  }


  /**
   * Add rate on the movie into the BDD
   */
  rate(subForm: any): any {
    const rate = {Source: subForm.rate.User, Value: subForm.rate.Rate};
    if (subForm.movie.Ratings === undefined) {
      subForm.movie.Ratings = [rate];
    } else {
      subForm.movie.Ratings.push(rate);
    }
    // TODO check user
    const user = {'id': '0', 'login': subForm.rate.User, 'password': subForm.rate.Password};
    return this._usersServcie.fetchLoginMDP(user)
      .pipe(
        map((m: any) => m[0] === undefined ? [] : subForm.movie)
        // map((m: any) => m[0] === undefined ? console.log('vide') : console.log('bon'))
      );
    // return this.update(subForm.movie);
  }
}
