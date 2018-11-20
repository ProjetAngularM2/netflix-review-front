import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {MoviesService} from '../shared/services/movies.service';
import {filter, flatMap, map} from 'rxjs/operators';
import {Movie} from '../shared/interfaces/movie';
import {DialogRatingsComponent} from '../shared/dialog/ratings/dialog.ratings.component';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {

  // private property to store dialog reference
  private _ratingsDialog: MatDialogRef<DialogRatingsComponent>;

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
        this._ratingsDialog = this._dialog.open(DialogRatingsComponent, {
          width: '500px',
          disableClose: true,
          data: movie
        });

        // subscribe to afterClosed observable to set dialog status and do process
        this._ratingsDialog.afterClosed()
          .pipe(
            filter(_ => !!_),
            flatMap(_ => this._moviesService.rate(_))
          )
          .subscribe(null, null, () => this._router.navigate([ '/home' ]));
      });
  }

}
