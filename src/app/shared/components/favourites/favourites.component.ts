import { Component, Output, EventEmitter } from '@angular/core';

import { DataSourceService } from '../../services/data-source.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent {
  @Output() public closeBar: EventEmitter<void> = new EventEmitter();

  public favorites$ = this.dataSource.favoriteJokes$;

  constructor(private dataSource: DataSourceService) { }
}
