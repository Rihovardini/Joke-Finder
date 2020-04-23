import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }   from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './shared/components/search/search.component';
import { JokeComponent } from './shared/components/joke/joke.component';
import { FavoritesComponent } from './shared/components/favorites/favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    JokeComponent,
    FavoritesComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
