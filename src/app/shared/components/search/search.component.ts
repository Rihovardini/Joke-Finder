import { Component } from '@angular/core';

import { DataSourceService } from '../../services/data-source.service';
import { SearchOptions, nonEmpty, SearchValidationMessages } from './search.constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../services/snackbar.service';
import { AlertStatus } from '../../constants/alert-status';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  public activeSearchType: string;
  public searchForm = this.buildSearchForm();
  public isSubmitted = false;

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

  public submit(): void {
    this.isSubmitted = true;
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
