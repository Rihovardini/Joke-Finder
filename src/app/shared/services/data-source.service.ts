import { Injectable } from '@angular/core';

import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AlertStatus } from '../constants/alert-status';
import { ApiConnectorService } from './api-connector.service';
import { Joke } from '../interfaces/joke';
import { Jokes } from '../interfaces/jokes';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {
  public categories$ = new BehaviorSubject<string[]>([]);
  public favoriteJokes$ = new BehaviorSubject<Joke[]>(this.getFavouritesFromLocalStorage());
  public favoriteJokesHashMap = new Map<string, boolean>(this.getFavouritesHashMap());
  public jokes$ = new BehaviorSubject([]);
  public loading$ = new BehaviorSubject<boolean>(false);

  constructor(private apiService: ApiConnectorService, private snackbarService: SnackbarService) { }

  public initDataSource(): void {
    this.initHashMap();
    this.getCategories();
  }

  public getCategories():void {
    this.loading$.next(true);
    this.apiService.getCategories().pipe(
      catchError((error) => {
        this.handleError();
        return throwError(error);
      })
    )
      .subscribe((categories: string[]) => {
        this.categories$.next(categories);
        this.loading$.next(false);
      });
  }

  public saveData(): void {
    this.setFavouritesToLocalStorage();
  }

  public getRandomJoke(): void {
    this.loading$.next(true);
    this.apiService.getRandomJoke().pipe(
      catchError((error) => {
        this.handleError();
        return throwError(error);
      })
    ).subscribe((joke: Joke) => {
      this.jokes$.next([joke]);
      this.loading$.next(false);
    });
  }

  public getRandomJokeByCategory(category: string): void {
    this.loading$.next(true);
    this.apiService.getRandomJokeByCategory(category).pipe(
      catchError((error) => {
        this.handleError();
        return throwError(error);
      })
    ).subscribe((joke: Joke) => {
      this.jokes$.next([joke]);
      this.loading$.next(false);
    });
  }

  public getJokesByQuery(query: string): void {
    this.loading$.next(true);
    this.apiService.getJokesByQuery(query).pipe(
      catchError((error) => {
        this.handleError();
        return throwError(error);
      })
    ).subscribe((jokes: Jokes) => {
      this.jokes$.next(jokes.result);
      this.loading$.next(false);
    });
  }

  public tooggleFavorite(joke: Joke): void {
    if (this.favoriteJokesHashMap.has(joke.id)) {
      this.removeFavoriteJoke(joke);
    } else {
      this.addFavoriteJoke(joke);
    }
  }
  
  private getFavouritesFromLocalStorage(): Joke[] {
    const favorites = localStorage.getItem('favourites');
    return JSON.parse(favorites) || [];
  }

  private setFavouritesToLocalStorage(): void {
    const favouritesJson = JSON.stringify(this.favoriteJokes$.getValue());
    const favouritesHashMap = JSON.stringify(Array.from(this.favoriteJokesHashMap));
    localStorage.setItem('favourites', favouritesJson);
    localStorage.setItem('favoritesHashMap', favouritesHashMap);
  }

  private getFavouritesHashMap(): [] {
    const favouritesHashMap = JSON.parse(localStorage.getItem('favoritesHashMap'));
    return favouritesHashMap || [];
  }

  private initHashMap(): void {
    const favourites = this.favoriteJokes$.getValue();

    for (const joke of favourites) {
      this.favoriteJokesHashMap.set(joke.id, true);
    }
  }

  private addFavoriteJoke(joke: Joke): void {
    const favourites = this.favoriteJokes$.getValue();
    this.favoriteJokes$.next([...favourites, joke]);
    this.favoriteJokesHashMap.set(joke.id, true);
  }

  private removeFavoriteJoke(jokeToRemove: Joke): void {
    const favourites = this.favoriteJokes$.getValue();
    const jokesWithoutRemoved = favourites.filter((joke: Joke) => joke.id !== jokeToRemove.id);
    this.favoriteJokes$.next(jokesWithoutRemoved);
    this.favoriteJokesHashMap.delete(jokeToRemove.id);
  }

  private handleError(): void {
    this.snackbarService.showMessage({
      type: AlertStatus.error,
      message: 'Something went wrong, try again later.',
      duration: 5000
    })
    this.loading$.next(false);
  }
}
