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

  // private property to store dialogStatus value
  private _dialogStatus: string;
  // private property to store dialog reference
  private _usersDialog: MatDialogRef<DialogUserComponent>;

  /**
   * Component constructor
   */
  constructor(private _matIconRegistry: MatIconRegistry, private _domSanitizer: DomSanitizer, private _dialog: MatDialog, private _usersServie: UsersService) {
    this._dialogStatus = 'inactive';
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this._matIconRegistry.addSvgIcon('icon-account', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/account_circle.svg'));
    this._matIconRegistry.addSvgIcon('icon-registration', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/registration.svg'));
  }

  /**
   * Returns private property _dialogStatus
   */
  get dialogStatus(): string {
    return this._dialogStatus;
  }

  /**
   * Function to display modal
   */
  showDialog() {
    // set dialog status
    this._dialogStatus = 'active';

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
        (_) => console.log(_.login) ,
        _ => this._dialogStatus = 'inactive',
        () => this._dialogStatus = 'inactive'
      );
  }

  /**
   * Add new user
   */
  private _add(user: User): Observable<User> {
    console.log(user);
     return this._usersServie
     .create(user);
  }
}
