import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertStatus } from '../../constants/alert-status';
import { DataSourceService } from '../../services/data-source.service';
import { SearchOptions, nonEmpty, SearchValidationMessages } from './search.constants';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  public activeSearchType: string;
  public loading$ = this.dataSource.loading$;
  public searchForm = this.buildSearchForm();

  public readonly categories$ = this.dataSource.categories$;
  public readonly optionNames = [SearchOptions.random, SearchOptions.fromCategories, SearchOptions.search];
  public readonly searchOptions = SearchOptions;

  constructor(
    private dataSource: DataSourceService,
    private snackbarService: SnackbarService,
    private formBuilder: FormBuilder) { }

  public setActive(option: string): void {
    this.activeSearchType = option;
  }

  public setCategory(category: string): void {
    this.searchForm.patchValue({ category });
  }

  public submit(event: Event): void {
    event.preventDefault();
    
    switch (this.activeSearchType) {
      case this.searchOptions.random:
        this.dataSource.getRandomJoke()
        break;
      case this.searchOptions.fromCategories:
        this.getRandomJokeByCategory();
        break;
      case this.searchOptions.search:
        this.getJokeBySearch();
        break;
      default: 
        this.snackbarService.showMessage({
          message: SearchValidationMessages.default,
          duration: 3000,
          type: AlertStatus.warning
        })
        break;  
    }
  }

  private getJokeBySearch(): void {
    const queryControl = this.searchForm.get('query');

    if(queryControl.valid) {
      this.dataSource.getJokesByQuery(queryControl.value);
    } else {
      this.snackbarService.showMessage({
        message: SearchValidationMessages.search, 
        duration: 3000,
        type: AlertStatus.warning
       });
    }
  }

  private getRandomJokeByCategory(): void {
    const categoryControl = this.searchForm.get('category');

    if (categoryControl.valid) {
      this.dataSource.getRandomJokeByCategory(categoryControl.value);
    } else {
      this.snackbarService.showMessage({
        message: SearchValidationMessages.category, 
        duration: 3000,
        type: AlertStatus.warning
       });
    }
  }

  private buildSearchForm(): FormGroup {
    return this.formBuilder.group({
      query: ['', [Validators.minLength(3), Validators.max(120), nonEmpty]],
      category: ['', [nonEmpty]]
    });
  }
}
