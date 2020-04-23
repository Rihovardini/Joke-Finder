import { Joke } from './joke';

export interface AppState {
  categories: string[];
  favorites: Joke[];
  jokes: Joke[];
}