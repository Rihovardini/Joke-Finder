import { Component, Input } from '@angular/core';

import { Joke } from '../../interfaces/joke';
import { DataSourceService } from '../../services/data-source.service';
import { timeBoundaries, times } from './joke.constants';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss']
})
export class JokeComponent {
  @Input() public joke: Joke;
  @Input() public showTag = true;

  constructor(private dataSource: DataSourceService) { }

  public isFavorite(id: string): boolean {
    return this.dataSource.favoriteJokesHashMap.has(id);
  }

  public toggleFavorite(joke: Joke): void {
    this.dataSource.tooggleFavorite(joke);
  }

  public get timeFromNow(): string {
    const currMiliseconds = Date.now()
    const pastMiliseconds = Date.parse(this.joke.updated_at);
    const diffFromNow = currMiliseconds - pastMiliseconds;

    const seconds = Math.floor(diffFromNow / times.seconds);
    const minutes = Math.floor(diffFromNow / times.minutes);
    const hours = Math.floor(diffFromNow / times.hours);
    const days = Math.floor(diffFromNow / times.days);

    if (seconds < timeBoundaries.milisecondsInSecond) {
      return `${seconds} second${this.getTimeEnding(seconds)} ago`;
    }

    if (minutes < timeBoundaries.secondsInMinute) {
      return `${minutes} minute${this.getTimeEnding(minutes)} ago`;
    }

    if (hours < timeBoundaries.hoursInDay) {
      return `${hours} hour${this.getTimeEnding(hours)} ago`;
    }

    if (days <= timeBoundaries.daysInMonth) {
      return `${days} day${this.getTimeEnding(days)} ago`;
    }

    if (days <= timeBoundaries.daysInYear) {
      const months = Math.round(days / timeBoundaries.daysInMonth);
      return `${months} month${this.getTimeEnding(months)} ago`;
    }

    if (days > timeBoundaries.daysInYear) {
      const years = Math.round(days / timeBoundaries.daysInYear);
      return `${years} year${this.getTimeEnding(years)} ago`;
    }
  }

  private getTimeEnding(time: number): string {
    return time === 1 ? '' : 's';
  }
}
