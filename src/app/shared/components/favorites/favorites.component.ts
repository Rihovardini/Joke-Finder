import { Component, Output, EventEmitter } from '@angular/core';

import { DataSourceService } from '../../services/data-source.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  @Output() public closeBar: EventEmitter<void> = new EventEmitter();

  public favorites$ = this.dataSource.favoriteJokes$;

  constructor(private dataSource: DataSourceService) { }
}
