import { TranslateService } from '@ngx-translate/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ThemePalette } from '@angular/material/core';

import { environment } from '../../../../environments/environment';
import { TenderConfig } from '../../../tender.config';
import { TenderService } from '../../../tender.service';
import { TenderCurrency } from '../../../types/tender-currency.type';
import { TenderUnit } from '../../../types/tender-unit.type';
import { TenderLocale } from '../../../types/tender-locale.type';
import { NewTenderDefaultValue } from '../../../types/new-tender-default-value.type';


@Component({
  selector: 'app-abstract-tender',
  template: ''
})
export abstract class AbstractTenderComponent extends TenderConfig implements OnInit, OnDestroy {

  get LOCALE(): TenderLocale {
    return this._LOCALE;
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
    return this._currencies;
  }

  get units(): TenderUnit[] {
    return this._units;
  }

  get currentThemePalette(): ThemePalette {
    return this._currentThemePalette;
  }

  get MIN_EXPECTED_VALUE(): number {
    return this._MIN_EXPECTED_VALUE;
  }

  get MAX_EXPECTED_VALUE(): number {
    return this._MAX_EXPECTED_VALUE;
  }

  get MIN_STEP_VALUE(): number {
    return this._MIN_STEP_VALUE;
  }

  get MAX_STEP_VALUE(): number {
    return this._MAX_STEP_VALUE;
  }

  get MIN_QUANTITY(): number {
    return this._MIN_QUANTITY;
  }

  get MAX_QUANTITY(): number {
    return this._MAX_QUANTITY;
  }

  get MIN_LENGTH_TITLE(): number {
    return this._MIN_LENGTH_TITLE;
  }

  get MAX_LENGTH_TITLE(): number {
    return this._MAX_LENGTH_TITLE;
  }

  get MIN_LENGTH_DESCRIPTION(): number {
    return this._MIN_LENGTH_DESCRIPTION;
  }

  get MAX_LENGTH_DESCRIPTION(): number {
    return this._MAX_LENGTH_DESCRIPTION;
  }

  get NEW_TENDER_DEFAULT_VALUE(): NewTenderDefaultValue {
    return this._NEW_TENDER_DEFAULT_VALUE;
  }


  protected constructor(protected translateService: TranslateService,
                        protected tenderService: TenderService,
                        protected router: Router) {
    super();
    this.translateService.use(this.currentLocale);
  }

  getLocalCurrencyName(currency: TenderCurrency): string {
    if (this.tenderService.currentLocale === this.LOCALE.UA) {
      return currency.nameUA;
    } else {
      return currency.nameEN;
    }
  }

  getLocalUnitCode(unit: TenderUnit): string {
    if (this.tenderService.currentLocale === this.LOCALE.UA) {
      return unit.codeUA;
    } else {
      return unit.codeEN;
    }
  }

  getLocalUnitFullName(unit: TenderUnit): string {
    if (this.tenderService.currentLocale === this.LOCALE.UA) {
      return unit.nameUA;
    } else {
      return unit.nameEN;
    }
  }


  ngOnInit(): void {
  }


  ngOnDestroy(): void {
  }

}
