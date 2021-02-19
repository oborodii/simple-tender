import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatSnackBarRef } from '@angular/material/snack-bar/snack-bar-ref';
import { TextOnlySnackBar } from '@angular/material/snack-bar/simple-snack-bar';

import { environment } from '../../environments/environment';
import { TenderConfig } from '../tender.config';
import { Tender } from '../types/tender.type';
import { TenderCurrency } from '../types/tender-currency.type';
import { TenderUnit } from '../types/tender-unit.type';
import { CreateItemFirebaseResponse } from '../types/create-item-firebase-response.type';


@Injectable({
  providedIn: 'root'
})
export class TenderService extends TenderConfig {

  // all tenders
  tenders: Tender[];

  // one selected tender
  selectedTender: Tender;

  // all locals from environment.ts
  locales: string[] = environment.locales;

  // selected by the user application language
  private _currentLocale: string;

  get currentLocale(): string {
    if (localStorage.getItem('locale')) {
      this._currentLocale = String(localStorage.getItem('locale'));
    } else {
      this._currentLocale = environment.defaultLocale;
    }
    localStorage.setItem('locale', this._currentLocale);

    return this._currentLocale;
  }

  set currentLocale(value: string) {
    this._currentLocale = value;
  }


  constructor(private http: HttpClient,
              private snackBar: MatSnackBar,
              private db: AngularFireDatabase) {
    super();
  }


  getLocalCurrencyName(currency: TenderCurrency): string {
    if (this.currentLocale === this._LOCALE.UA) {
      return currency.nameUA;
    } else {
      return currency.nameEN;
    }
  }


  getLocalUnitCode(unit: TenderUnit): string {
    if (this.currentLocale === this._LOCALE.UA) {
      return unit.codeUA;
    } else {
      return unit.codeEN;
    }
  }


  getLocalUnitFullName(unit: TenderUnit): string {
    if (this.currentLocale === this._LOCALE.UA) {
      return unit.nameUA;
    } else {
      return unit.nameEN;
    }
  }


  /** Get list of tenders from Firebase in realtime */
  getTenders(): Observable<Tender[]> {
    // snapshotChanges().map() is used to store 'key' as 'id'
    return this.db.list(this._TENDERS_DB_TABLE_NAME).snapshotChanges().pipe(
      map(changes => changes.map(c => ({
        id: c.payload.key,
        // @ts-ignore
        ...c.payload.val()
      })))
    );
  }


  /** Get one tender by its id from tenders.json in realtime */
  getTenderById(id: string): Observable<Tender | null> {
    const path: string = this._TENDERS_DB_TABLE_NAME + `/${id}`;

    return (this.db.object(path).valueChanges() as Observable<Tender>).pipe(
      map((response: Tender) => {
        if (response === null) {
          return null;
        } else {
          return {
            id: id,
            ...response
          };
        }
      })
    );
  }


  /** Create a new tender in Firebase */
  createTender(tender: Tender): Observable<Tender> {
    return this.http.post<any>(this._FIREBASE_TENDERS_URL + '.json', tender).pipe(
      map((response: CreateItemFirebaseResponse) => {
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


  /** Edit tender in Firebase */
  editTender(tender: Tender): Observable<Tender> {
    const url: string = this._FIREBASE_TENDERS_URL + `/${tender.id}.json`;

    return this.http.patch<Tender>(url, tender).pipe(
      map((response: Tender) => {
        const newTender: Tender = {
          ...tender,
          dateStart: new Date(response.dateStart),
          dateEnd: new Date(response.dateEnd)
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
    return this.snackBar.open(message, action, {
      panelClass: panelClass,
      duration: Number(duration),
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition
    });
  }

}
