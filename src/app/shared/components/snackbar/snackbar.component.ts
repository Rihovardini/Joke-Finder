import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '../../services/snackbar.service';
import { Alert } from '../../interfaces/alert';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {
  public alert: Alert;
  public isMessageVisible = false;

  constructor(private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.notificationListener();
  }

  private notificationListener(): void {
    this.snackbarService.messageSubject.subscribe((alert: Alert) => {
      if (!this.isMessageVisible) {
        this.alert = alert;
        this.showSnackbar();
        this.hideSnackbar(alert.duration);
      }
    });
  }

  private showSnackbar(): void {
    this.isMessageVisible = true;
    this.toogleSnackbar();
  }

  private hideSnackbar(timeout: number): void {
    setTimeout(() => {
      this.toogleSnackbar();
      this.isMessageVisible = false;
    }, timeout);
  }

  private toogleSnackbar(): void {
    const snackbarElement = document.querySelector('.snackbar');
    snackbarElement.classList.toggle(this.alert.type);
  }
}