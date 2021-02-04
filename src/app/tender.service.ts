import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSnackBarRef } from '@angular/material/snack-bar/snack-bar-ref';
import { TextOnlySnackBar } from '@angular/material/snack-bar/simple-snack-bar';

import { environment } from '../environments/environment';
import { TenderConfig } from './tender.config';
import { Tender } from './types/tender.type';
import { CreateTenderFirebaseResponse } from './types/create-tender-firebase-response.type';


@Injectable({
  providedIn: 'root'
})
export class TenderService extends TenderConfig {

  subscriptions: Subscription = new Subscription();

  tenders: Tender[];

  // all locals from environment.ts
  locales: string[] = environment.locales;

  // selected by the user application language
  currentLocale: string;


  constructor(private http: HttpClient,
              private snackBar: MatSnackBar) {
    super();
  }


  getTenders(): Observable<Tender[]> {
    return this.http.get<Tender[]>(this._FIREBASE_DB_URL).pipe(
      map((response: { [key: string]: any }) => {
        return Object.keys(response)
          .map((key: string) => ({
            id: key,
            ...response[key]
          }));
      })
    );
  }


  createTender(tender: Tender): Observable<Tender> {
    return this.http.post<any>(this._FIREBASE_DB_URL, tender).pipe(
      map((response: CreateTenderFirebaseResponse) => {
        const newTender: Tender = {
          ...tender,
          id: response.name,
          dateStart: new Date(tender.dateStart),
          dateEnd: new Date(tender.dateEnd)
        };
        return newTender;
      })
    );
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
