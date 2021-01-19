import { TranslateService } from '@ngx-translate/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { TenderConfig } from '../../../tender.config';
import { TenderService } from '../../../tender.service';
import { TenderCurrency } from '../../../types/tender-currency.type';
import { TenderUnit } from '../../../types/tender-unit.type';
import { ThemePalette } from '@angular/material/core';


@Component({
  selector: 'app-abstract-tender',
  template: ''
})
export abstract class AbstractTenderComponent extends TenderConfig implements OnInit, OnDestroy {

  // all locals from environment.ts
  locales: string[] = environment.locales;

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
    return this.tenderService.currencies;
  }

  get units(): TenderUnit[] {
    return this.tenderService.units;
  }

  get currentThemePalette(): ThemePalette {
    return this._currentThemePalette;
  }

  get MIN_MONEY_EXPECTED_VALUE(): number {
    return this._MIN_MONEY_EXPECTED_VALUE;
  }

  get MAX_MONEY_EXPECTED_VALUE(): number {
    return this._MAX_MONEY_EXPECTED_VALUE;
  }


  protected constructor(protected translateService: TranslateService,
                        protected tenderService: TenderService,
                        protected router: Router) {
    super();
    this.translateService.use(this.currentLocale);
  }

  getLocalCurrencyName(currency: TenderCurrency): string {
    if (this.tenderService.currentLocale === 'ua') {
      return currency.nameUA;
    } else {
      return currency.nameEN;
    }
  }

  getLocalUnitCode(unit: TenderUnit): string {
    if (this.tenderService.currentLocale === 'ua') {
      return unit.codeUA;
    } else {
      return unit.codeEN;
    }
  }

  getLocalUnitFullName(unit: TenderUnit): string {
    if (this.tenderService.currentLocale === 'ua') {
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
