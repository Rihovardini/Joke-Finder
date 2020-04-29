import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }   from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './shared/components/search/search.component';
import { JokeComponent } from './shared/components/joke/joke.component';
import { FavouritesComponent } from './shared/components/favourites/favourites.component';
import { SnackbarComponent } from './shared/components/snackbar/snackbar.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { PaginationComponent } from './shared/components/pagination/pagination.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    JokeComponent,
    FavouritesComponent,
    SnackbarComponent,
    SpinnerComponent,
    PaginationComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
