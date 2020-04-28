import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { Alert } from '../interfaces/alert'

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  public messageSubject = new Subject();

  public showMessage(notification: Alert): void {
    this.messageSubject.next(notification);
  }
}