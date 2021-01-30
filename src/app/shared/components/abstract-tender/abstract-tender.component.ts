import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ThemePalette } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '../../../../environments/environment';
import { TenderService } from '../../../tender.service';
import { TenderCurrency } from '../../../types/tender-currency.type';
import { TenderUnit } from '../../../types/tender-unit.type';
import { TenderLocale } from '../../../types/tender-locale.type';
import { NewTenderDefaultValue } from '../../../types/new-tender-default-value.type';
import { LoginDefaultValue } from '../../../types/login-default-value.type';
import { FirebaseErrorMessage } from '../../../types/firebase-error-message.type';


@Component({
  selector: 'st-abstract-tender',
  template: ''
})
export abstract class AbstractTenderComponent implements OnInit, OnDestroy {

  protected subscriptions: Subscription = new Subscription();

  get LOCALE(): TenderLocale {
    return this.tenderService._LOCALE;
  }

  get locales(): string[] {
    return this.tenderService.locales;
  }

  get currentLocale(): string {
    if (localStorage.getItem('locale')) {
      this.tenderService.currentLocale = String(localStorage.getItem('locale'));
    } else {
      this.tenderService.currentLocale = environment.defaultLocale;
    }
    localStorage.setItem('locale', this.tenderService.currentLocale);

    return this.tenderService.currentLocale;
  }

  set currentLocale(value: string) {
    this.tenderService.currentLocale = value;
  }

  get currencies(): TenderCurrency[] {
    return this.tenderService._currencies;
  }

  get units(): TenderUnit[] {
    return this.tenderService._units;
  }

  get currentThemePalette(): ThemePalette {
    return this.tenderService._currentThemePalette;
  }

  get NEW_TENDER_DEFAULT_VALUE(): NewTenderDefaultValue {
    return this.tenderService._NEW_TENDER_DEFAULT_VALUE;
  }

  get LOGIN_DEFAULT_VALUE(): LoginDefaultValue {
    return this.tenderService._LOGIN_DEFAULT_VALUE;
  }

  get FIREBASE_ERROR_MESSAGE(): FirebaseErrorMessage {
    return this.tenderService._FIREBASE_ERROR_MESSAGE;
  }


  protected constructor(protected translateService: TranslateService,
                        protected tenderService: TenderService,
                        protected router: Router) {
    this.translateService.use(this.currentLocale);
  }


  ngOnInit(): void {
  }


  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

}
