import { Injectable, inject } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})

/**
 * This service is used to display a snackbar message.
 * It is used to display a message to the user.
 * @param {MatSnackBar} _snackBar - The snackbar service.
 */
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar({
    message,
    action,
    actionLabel,
    horizontalPosition = 'start',
    verticalPosition = 'bottom',
    duration,
    direction,
    panelClass,
  }: {
    message: string;
    action?: Function;
    actionLabel?: string;
    horizontalPosition?: MatSnackBarHorizontalPosition;
    verticalPosition?: MatSnackBarVerticalPosition;
    duration?: number;
    direction?: 'ltr' | 'rtl';
    panelClass?: string;
  }) {
    let snackBarRef = this._snackBar.open(
      message,
      action !== undefined && !actionLabel ? 'Ok' : actionLabel,
      {
        horizontalPosition,
        verticalPosition,
        duration,
        direction,
        panelClass,
      }
    );

    if (action) {
      snackBarRef.onAction().subscribe(() => {
        action();
      });
    }
  }
}
