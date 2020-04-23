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
      return `${seconds} seconds ago`;
    }

    if (minutes < timeBoundaries.secondsInMinute) {
      return `${minutes} minutes ago`;
    }

    if (hours < timeBoundaries.hoursInDay) {
      return `${hours} hours ago`;
    }

    if (days <= timeBoundaries.daysInMonth) {
      return `${days} days ago`;
    }

    if (days <= timeBoundaries.daysInYear) {
      const weeks = Math.floor(days / timeBoundaries.daysInWeek);
      return `${weeks} weeks ago`;
    }

    if (days > timeBoundaries.daysInYear) {
      const years = Math.floor(days / timeBoundaries.daysInYear);
      return `${years} years ago`
    }
  }
}
