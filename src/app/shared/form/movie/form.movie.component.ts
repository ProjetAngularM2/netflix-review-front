import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Movie} from '../../interfaces/movie';

@Component({
  selector: 'app-form-movie',
  templateUrl: './form.movie.component.html',
  styleUrls: [ './form.movie.component.css' ]
})
export class FormMovieComponent implements OnInit, OnChanges {
  // private property to store update mode flag
  private _isUpdateMode: boolean;
  // private property to store model value
  private _model: Movie;
  // private property to store cancel$ value
  private readonly _cancel$: EventEmitter<void>;
  // private property to store submit$ value
  private readonly _submit$: EventEmitter<Movie>;
  private readonly _submitSearch$: EventEmitter<string>;
  // private property to store form value
  private readonly _form: FormGroup;
  private readonly _formSearch: FormGroup;


  /**
   * Component constructor
   */
  constructor() {
    this._submit$ = new EventEmitter<Movie>();
    this._submitSearch$ = new EventEmitter<string>();
    this._cancel$ = new EventEmitter<void>();
    this._form = this._buildForm();
    this._formSearch = this._buildFormSearch();
  }

  /**
   * Sets private property _model
   */
  @Input()
  set model(model: Movie) {
    this._model = model;
  }

  /**
   * Returns private property _model
   */
  get model(): Movie {
    return this._model;
  }


  /**
   * Returns private property _form
   */
  get form(): FormGroup {
    return this._form;
  }

  /**
   * Returns private property _formSearch
   */
  get formSearch(): FormGroup {
    return this._formSearch;
  }

  /**
   * Returns private property _isUpdateMode
   */
  get isUpdateMode(): boolean {
    return this._isUpdateMode;
  }

  /**
   * Returns private property _cancel$
   */
  @Output('cancel')
  get cancel$(): EventEmitter<void> {
    return this._cancel$;
  }

  /**
   * Returns private property _submit$
   */
  @Output('submit')
  get submit$(): EventEmitter<Movie> {
    return this._submit$;
  }

  @Output('submitSearch')
  get submitSearch$(): EventEmitter<String> {
    return this._submitSearch$;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
  }

  /**
   * Function to handle component update
   */
  ngOnChanges(record) {
    if (record.model && record.model.currentValue) {
      this._model = record.model.currentValue;
      this._isUpdateMode = true;
      this._form.patchValue(this._model);
    } else {
      this._model = {
        Poster: '',
        Title: '',
        Released: '',
        Metascore: '',
        Genre: '',
        Plot: ''
      };
      this._isUpdateMode = false;
    }
  }

  /**
   * Function to emit event to cancel process
   */
  cancel() {
    this._cancel$.emit();
  }

  /**
   * Function to emit event to submit form and movie
   */
  submit(movie: Movie) {
    this._submit$.emit(movie);
  }

  /**
   * Function to emit event to submit form and movie
   */
  submitSearch(s: string) {
    this._submitSearch$.emit(s);
  }

  /**
   * Function to build our form
   */
  private _buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl('0'),
      Title: new FormControl('', Validators.required),
      Genre: new FormControl('', Validators.required),
      Plot: new FormControl('', Validators.required),
      Metascore: new FormControl('', Validators.compose([
      Validators.required, Validators.pattern('\\d{1,3}')
      ])),
      Year: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern('\\d{4}')
      ])),
      Poster: new FormControl('', Validators.required)
    });
  }

  /**
   * Function to build our form
   */
  private _buildFormSearch(): FormGroup {
    return new FormGroup({
      search: new FormControl('', Validators.required)
    });
  }
}
