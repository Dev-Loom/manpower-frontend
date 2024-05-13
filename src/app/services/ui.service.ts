import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UIService {
  constructor(private _snackBar: MatSnackBar) {}

  showSnackBar(message: string, action: any, duration: number) {
    this._snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
    });
  }

  isAuthenticated = new BehaviorSubject<boolean>(false);
  userName = new BehaviorSubject<string>('User');
  isExpaned = new BehaviorSubject<boolean>(true);
}
