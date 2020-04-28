import { AbstractControl, ValidationErrors } from '@angular/forms';

export const nonEmpty = (control: AbstractControl): ValidationErrors | null => {
  const trimmedValue = control.value.trim();
  return trimmedValue ? null : { required: true };
};

export enum SearchOptions {
  random = 'random',
  search = 'search',
  fromCategories = 'from categories'
}

export enum SearchValidationMessages {
  search = 'Text in a search field has to be in a range from 3 to 120 symbols.',
  category = 'Please, select joke category.'
}