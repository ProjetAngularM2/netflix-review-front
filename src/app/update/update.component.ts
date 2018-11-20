import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {MoviesService} from '../shared/services/movies.service';
import {DialogMovieComponent} from '../shared/dialog/movie/dialog.movie.component';
import {filter, flatMap, map} from 'rxjs/operators';
import {Movie} from '../shared/interfaces/movie';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  // private property to store dialog reference
  private _moviesDialog: MatDialogRef<DialogMovieComponent>;

  /**
   * Component constructor
   */
  constructor(private _route: ActivatedRoute, private _router: Router, private _moviesService: MoviesService, private _dialog: MatDialog) {
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this._route.params
      .pipe(
        map((params: any) => params.id),
        flatMap((id: string) => this._moviesService.fetchOne(id))
      )
      .subscribe((movie: Movie) => {
        this._moviesDialog = this._dialog.open(DialogMovieComponent, {
          width: '500px',
          disableClose: true,
          data: movie
        });

        // subscribe to afterClosed observable to set dialog status and do process
        this._moviesDialog.afterClosed()
          .pipe(
            filter(_ => !!_),
            flatMap(_ => this._moviesService.update(_))
          )
          .subscribe(null, null, () => this._router.navigate([ '/home' ]));
      });
  }

}
