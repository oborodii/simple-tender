import { Injectable } from '@angular/core';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSnackBarRef } from '@angular/material/snack-bar/snack-bar-ref';
import { TextOnlySnackBar } from '@angular/material/snack-bar/simple-snack-bar';

import { TenderCurrency } from './types/tender-currency.type';
import { TenderUnit } from './types/tender-unit.type';


@Injectable({
  providedIn: 'root'
})
export class TenderService {

  // selected by the user application language
  currentLocale: string;

  // all currencies used in the application
  currencies: TenderCurrency[] = [
    {
      id: 1,
      code: 'UAH',
      nameUA: 'Українська гривня',
      nameEN: 'Ukrainian hryvnia'
    },
    {
      id: 2,
      code: 'USD',
      nameUA: 'Долар США',
      nameEN: 'U.S. dollar'
    },
    {
      id: 3,
      code: 'EUR',
      nameUA: 'Євро',
      nameEN: 'Euro'
    }
  ];

  // in what units the goods are measured
  units: TenderUnit[] = [
    {
      id: 1,
      codeUA: 'кг',
      codeEN: 'кг',
      nameUA: 'кілограм',
      nameEN: 'kilogram'
    },
    {
      id: 2,
      codeUA: 'шт',
      codeEN: 'pcs',
      nameUA: 'штука',
      nameEN: 'piece'
    },
    {
      id: 3,
      codeUA: 'л',
      codeEN: 'L',
      nameUA: 'літр',
      nameEN: 'liter'
    },
    {
      id: 4,
      codeUA: 'м',
      codeEN: 'm',
      nameUA: 'метр',
      nameEN: 'meter'
    }
  ];

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
