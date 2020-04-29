import { Component, Input, OnChanges } from '@angular/core';
import { Joke } from '../../interfaces/joke';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  @Input() public jokes: Joke[];
  @Input() public recordsPerPage = 50;

  public jokesOnPage: Joke[];
  public startIndex = 0;
  public endIndex: number;

  public ngOnChanges(): void {
    this.endIndex = this.recordsPerPage > this.jokes.length ? this.jokes.length : this.recordsPerPage;
    this.setRecordsOnPage();
  }

  public onPreviousPage(event: Event): void {
    event.preventDefault();
    this.endIndex = this.startIndex;
    this.startIndex -= this.recordsPerPage;
    this.setRecordsOnPage();
    this.scrollTop();
  }

  public onNextPage(event: Event): void {
    event.preventDefault();
    this.startIndex = this.endIndex;
    this.endIndex = this.getNextPageCount(); 
    this.setRecordsOnPage();
    this.scrollTop();
  }

  private getNextPageCount(): number {
    const nextPageCount = this.recordsPerPage + this.endIndex;
    return nextPageCount > this.jokes.length ? this.jokes.length : nextPageCount;
  }

  private scrollTop(): void {
    const paginationElement = document.querySelector('.pagination');
    paginationElement.scrollIntoView();
  }

  private setRecordsOnPage(): void {
    this.jokesOnPage = [];
    for (let i=this.startIndex; i<this.endIndex; i++) {
      this.jokesOnPage.push(this.jokes[i]);
    }
  }
}