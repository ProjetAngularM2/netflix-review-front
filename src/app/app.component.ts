import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {DialogUserComponent} from './shared/dialog/user/dialog.user.component';
import {filter, flatMap} from 'rxjs/operators';
import {User} from './shared/interfaces/user';
import {Observable, of} from 'rxjs';
import {UsersService} from './shared/services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // private property to store dialog reference
  private _usersDialog: MatDialogRef<DialogUserComponent>;

  /**
   * Component constructor
   */
  constructor(private _matIconRegistry: MatIconRegistry, private _domSanitizer: DomSanitizer, private _dialog: MatDialog, private _usersServie: UsersService) {
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this._matIconRegistry.addSvgIcon('icon-registration', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/registration.svg'));
  }

  /**
   * Function to display modal
   */
  showDialogRegistration() {
    // set dialog status

    // open modal
    this._usersDialog = this._dialog.open(DialogUserComponent, {
      width: '500px',
      disableClose: true
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._usersDialog.afterClosed()
      .pipe(
        filter(_ => !!_),
        flatMap(_ => this._add(_))
      )
      .subscribe(
        (_) => console.log(_.login));
  }

  /**
   * Add new user
   */
  private _add(user: User): Observable<User> {
     return this._usersServie
     .create(user);
  }

}
