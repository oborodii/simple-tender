import { TranslateService } from '@ngx-translate/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { TenderService } from '../../../tender.service';
import { TenderCurrency } from '../../../types/tender-currency.type';
import { TenderUnit } from '../../../types/tender-unit.type';


@Component({
  selector: 'app-abstract-tender',
  template: ''
})
export abstract class AbstractTenderComponent implements OnInit, OnDestroy {

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


  protected constructor(protected translateService: TranslateService,
                        protected tenderService: TenderService,
                        protected router: Router) {
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
