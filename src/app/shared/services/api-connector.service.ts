import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { apiUrls } from '../constants/api-urls';
import { Joke } from '../interfaces/joke';
import { Jokes } from '../interfaces/jokes';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectorService {
  constructor(private httpClient: HttpClient) { }

  public getCategories(): Observable<string[]> {
    return this.httpClient.get<string[]>(apiUrls.categories);
  }

  public getRandomJoke(): Observable<Joke> {
    return this.httpClient.get<Joke>(apiUrls.randomJoke);
  }

  public getRandomJokeByCategory(category: string): Observable<Joke> {
    return this.httpClient.get<Joke>(`${apiUrls.randomJokeByCategory}=${category}`);
  }
  
  public getJokesByQuery(query: string): Observable<Jokes> {
    return this.httpClient.get<Jokes>(`${apiUrls.searchJokes}=${query}`);
  }
}
