import { Component, OnInit } from '@angular/core';

import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DataSourceService } from './shared/services/data-source.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public jokes$ = this.dataSource.jokes$;
  public loading$ = this.dataSource.loading$;
  public isSideBarOpen = false;

  private isAppAlive$ = new Subject();

  constructor(private dataSource: DataSourceService) { }
  
  public ngOnInit(): void {
    this.dataSource.initDataSource();
    this.beforeUnloadListener();
  }

  private beforeUnloadListener(): void {
    fromEvent(window, 'beforeunload')
      .pipe(
        takeUntil(this.isAppAlive$)
      )
      .subscribe(() => {
        this.dataSource.saveData();
        this.isAppAlive$.next();
        this.isAppAlive$.complete();
      });
  }

  public toogleFavouritesSideBar(): void {
    this.isSideBarOpen = !this.isSideBarOpen;
  }
}
