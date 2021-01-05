import { Injectable } from '@angular/core';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSnackBarRef } from '@angular/material/snack-bar/snack-bar-ref';
import { TextOnlySnackBar } from '@angular/material/snack-bar/simple-snack-bar';


@Injectable({
  providedIn: 'root'
})
export class TenderService {

  constructor(private snackBar: MatSnackBar) {
  }

  openSnackBar(message: string,
               action: string,
               duration: string = '3000',
               horizontalPosition: MatSnackBarHorizontalPosition = 'right',
               verticalPosition: MatSnackBarVerticalPosition = 'top'): MatSnackBarRef<TextOnlySnackBar> {
    const snackBarRef: MatSnackBarRef<TextOnlySnackBar> = this.snackBar.open(message, action, {
      duration: Number(duration),
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition
    });

    snackBarRef.afterDismissed().subscribe(
      () => {
        console.log('The snack-bar was dismissed');
      });

    snackBarRef.onAction().subscribe(
      () => {
        console.log('The snack-bar action was triggered!');
      });

    return snackBarRef;
  }

}
