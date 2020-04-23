import { Component } from '@angular/core';

import { DataSourceService } from '../../services/data-source.service';
import { SearchOptions } from './search.constants';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  public activeSearchType: string;
  public query: string;

  public readonly categories$ = this.dataSource.categories$;
  public readonly optionNames = [SearchOptions.random, SearchOptions.fromCategories, SearchOptions.search];
  public readonly searchOptions = SearchOptions;

  constructor(private dataSource: DataSourceService) { }

  public setActive(option: string): void {
    this.activeSearchType = option;
    this.query = '';
  }

  public setCategory(category: string): void {
    this.query = category;
  }

  public submit(): void {
    switch (this.activeSearchType) {
      case this.searchOptions.random:
        this.dataSource.getRandomJoke()
        break;
      case this.searchOptions.fromCategories:
        this. query && this.dataSource.getRandomJokeByCategory(this.query); 
        break;
      case this.searchOptions.search:
        this. query && this.dataSource.getJokesByQuery(this.query)
        break;   
    }
  }
}
