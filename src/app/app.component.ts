import { Component, OnInit } from '@angular/core';

import { DataSourceService } from './shared/services/data-source.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public jokes$ = this.dataSource.jokes$;
  public isSideBarOpen = false;

  constructor(private dataSource: DataSourceService) { }
  
  public ngOnInit(): void {
    this.dataSource.initDataSource();
  }

  public toogleFavoritesSideBar(): void {
    this.isSideBarOpen = !this.isSideBarOpen;
  }
}
