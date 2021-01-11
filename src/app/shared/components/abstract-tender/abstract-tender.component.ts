import { TranslateService } from '@ngx-translate/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { TenderService } from '../../../tender.service';


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


  ngOnInit(): void {
  }


  ngOnDestroy(): void {
  }

}
