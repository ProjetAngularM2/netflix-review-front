import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Movie} from '../../interfaces/movie';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-form-ratings',
  templateUrl: './form.ratings.component.html',
  styleUrls: ['./form.ratings.component.css']
})
export class FormRatingsComponent implements OnInit, OnChanges {

  // private property to store model value
  private _model: Movie;
  // private property to store cancel$ value
  private readonly _cancel$: EventEmitter<void>;
  // private property to store submit$ value
  private readonly _submit$: EventEmitter<any>;
  // private property to store form value
  private readonly _form: FormGroup;

  constructor() {
    this._submit$ = new EventEmitter<Movie>();
    this._cancel$ = new EventEmitter<void>();
    this._form = this._buildForm();
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

  ngOnInit() {
  }

  ngOnChanges(record) {
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
  submit(rate: any) {
    const movie = this._model;
    const s = {movie, rate};
    this._submit$.emit(s);
  }


  private _buildForm() {
    return new FormGroup({
      User: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required),
      Rate: new FormControl('', Validators.required)
    });
  }
}
