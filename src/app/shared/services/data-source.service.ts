import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { ApiConnectorService } from './api-connector.service';
import { Joke } from '../interfaces/joke';
import { Jokes } from '../interfaces/jokes';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {
  public categories$ = new BehaviorSubject([]);
  public favoriteJokes$ = new BehaviorSubject(this.getFavoritesFromLocalStorage());
  public favoriteJokesHashMap = new Map();

  public jokes$ = new BehaviorSubject([]);

  constructor(private apiService: ApiConnectorService) { }

  private getFavoritesFromLocalStorage(): Joke[] {
    const favorites =  localStorage.getItem('favorites');
    return JSON.parse(favorites) || [];
  }

  private setFavoritesToLocalStorage(): void {
    const favoritesJson = JSON.stringify(this.favoriteJokes$.getValue());
    localStorage.setItem('favorites', favoritesJson);
  }

  private initHashMap(): void {
    const favorites = this.favoriteJokes$.getValue();
    
    for (const joke of favorites) {
      this.favoriteJokesHashMap.set(joke.id, true);
    }
  }

  private addFavoriteJoke(joke: Joke): void {
    const favorites = this.favoriteJokes$.getValue();
    this.favoriteJokes$.next([...favorites, joke]);
    this.favoriteJokesHashMap.set(joke.id, true);
  }

  private removeFavoriteJoke(jokeToRemove: Joke): void {
    const favorites = this.favoriteJokes$.getValue();
    const jokesWithoutRemoved = favorites.filter((joke: Joke) => joke.id !== jokeToRemove.id);
    this.favoriteJokes$.next(jokesWithoutRemoved);
    this.favoriteJokesHashMap.delete(jokeToRemove.id);
  }

  public initDataSource(): void {
    this.initHashMap();
    this.apiService.getCategories().subscribe((categories: string[]) => {
      this.categories$.next(categories);
    });
  }

  public cleatDataSource(): void {
    this.setFavoritesToLocalStorage();
  }

  public getRandomJoke(): void {
    this.apiService.getRandomJoke().subscribe((joke: Joke) => {
      this.jokes$.next([joke]);
    });
  }

  public getRandomJokeByCategory(category: string): void {
    this.apiService.getRandomJokeByCategory(category).subscribe((joke: Joke) => {
      this.jokes$.next([joke]);
    });
  }

  public getJokesByQuery(query: string): void {
    this.apiService.getJokesByQuery(query).subscribe((jokes: Jokes) => {
      this.jokes$.next(jokes.result);
    });
  }

  public tooggleFavorite(joke: Joke): void {
    if (this.favoriteJokesHashMap.has(joke.id)) {
      this.removeFavoriteJoke(joke);
    } else {
      this.addFavoriteJoke(joke);
    }

    this.setFavoritesToLocalStorage();
  }
}
