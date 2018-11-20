import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatInputModule, MatToolbarModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {DialogUserComponent} from './shared/dialog/user/dialog.user.component';
import {FormUserComponent} from './shared/form/user/form.user.component';
import { MovieComponent } from './movie/movie.component';
import {CardComponent} from './shared/card/card.component';
import {FormMovieComponent} from './shared/form/movie/form.movie.component';
import {DialogMovieComponent} from './shared/dialog/movie/dialog.movie.component';
import { UpdateComponent } from './update/update.component';
import { FormRatingsComponent } from './shared/form/ratings/form.ratings.component';
import { RateComponent } from './rate/rate.component';
import {DialogRatingsComponent} from './shared/dialog/ratings/dialog.ratings.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DialogUserComponent,
    FormUserComponent,
    MovieComponent,
    CardComponent,
    FormMovieComponent,
    DialogMovieComponent,
    UpdateComponent,
    FormRatingsComponent,
    DialogRatingsComponent,
    RateComponent
  ],
  entryComponents: [ DialogUserComponent, DialogMovieComponent, DialogRatingsComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
