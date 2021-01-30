import { Injectable } from '@angular/core';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSnackBarRef } from '@angular/material/snack-bar/snack-bar-ref';
import { TextOnlySnackBar } from '@angular/material/snack-bar/simple-snack-bar';

import { environment } from '../environments/environment';
import { TenderConfig } from './tender.config';


@Injectable({
  providedIn: 'root'
})
export class TenderService extends TenderConfig {

  // all locals from environment.ts
  locales: string[] = environment.locales;

  // selected by the user application language
  currentLocale: string;


  constructor(private snackBar: MatSnackBar) {
    super();
  }

  openSnackBar(message: string,
               panelClass = 'snack-bar-error',
               duration: string = '3000',
               horizontalPosition: MatSnackBarHorizontalPosition = 'right',
               verticalPosition: MatSnackBarVerticalPosition = 'top',
               action: string = 'X'): MatSnackBarRef<TextOnlySnackBar> {

    const snackBarRef: MatSnackBarRef<TextOnlySnackBar> = this.snackBar.open(message, action, {
      panelClass: panelClass,
      duration: Number(duration),
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition
    });

    // closed by timer (duration)
    snackBarRef.afterDismissed().subscribe(
      () => {
        console.log('The snack-bar was dismissed');
      });

    // closed by user click
    snackBarRef.onAction().subscribe(
      () => {
        console.log('The snack-bar action was triggered!');
      });

    return snackBarRef;
  }

}
