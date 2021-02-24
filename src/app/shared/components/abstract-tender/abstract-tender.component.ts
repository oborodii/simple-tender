import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ThemePalette } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';

import { TenderService } from '../../../services/tender.service';
import { AuthService } from '../../../services/auth.service';
import { Tender } from '../../../types/tender.type';
import { TenderCurrency } from '../../../types/tender-currency.type';
import { TenderUnit } from '../../../types/tender-unit.type';
import { TenderLocale } from '../../../types/tender-locale.type';
import { NewTenderDefaultValue } from '../../../types/new-tender-default-value.type';
import { LoginDefaultValue } from '../../../types/login-default-value.type';
import { FirebaseErrorMessage } from '../../../types/firebase-error-message.type';
import { SnackBarTxtColor } from '../../../types/snack-bar-txt-color.type';
import { MaterialIcons } from '../../../types/material-icons.type';
import { RouterUrl } from '../../../types/router-url.type';
import { BetDefaultValue } from '../../../types/bet-default-value.type';
import { FirebaseConst } from '../../../types/firebase-const.type';


@Component({
  selector: 'st-abstract-tender',
  template: ''
})
export abstract class AbstractTenderComponent implements OnDestroy {

  subscriptions: Subscription = new Subscription();

  get isUserAuth(): boolean {
    return this.authService.isUserAuth;
  }

  get LOCALE(): TenderLocale {
    return this.tenderService._LOCALE;
  }

  get locales(): string[] {
    return this.tenderService.locales;
  }

  get currentLocale(): string {
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

  get BET_DEFAULT_VALUE(): BetDefaultValue {
    return this.tenderService._BET_DEFAULT_VALUE;
  }

  get FIREBASE_ERROR_MESSAGE(): FirebaseErrorMessage {
    return this.tenderService._FIREBASE_ERROR_MESSAGE;
  }

  get SNACKBAR(): SnackBarTxtColor {
    return this.tenderService._SNACKBAR;
  }

  get FIREBASE(): FirebaseConst {
    return this.tenderService._FIREBASE;
  }

  get MATERIAL_ICON(): MaterialIcons {
    return this.tenderService._MATERIAL_ICON;
  }

  get ROUTER_URL(): RouterUrl {
    return this.tenderService._ROUTER_URL;
  }

  get selectedTender(): Tender {
    return this.tenderService.selectedTender;
  }

  set selectedTender(value: Tender) {
    this.tenderService.selectedTender = value;
  }


  protected constructor(protected translateService: TranslateService,
                        protected tenderService: TenderService,
                        protected authService: AuthService
  ) {
    this.translateService.use(this.currentLocale);
  }

  translate(key: string): string {
    return this.translateService.instant(key);
  }

  getLocalUnitCode(unit: TenderUnit): string {
    return this.tenderService.getLocalUnitCode(unit);
  }


  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }

}
