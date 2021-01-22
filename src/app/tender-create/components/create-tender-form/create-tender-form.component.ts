import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { AbstractTenderComponent } from '../../../shared/components/abstract-tender/abstract-tender.component';
import { TenderService } from '../../../tender.service';
import { TenderCurrency } from '../../../types/tender-currency.type';
import { TenderUnit } from '../../../types/tender-unit.type';


@Component({
  selector: 'st-test-address-form',
  templateUrl: './create-tender-form.component.html',
  styleUrls: ['./create-tender-form.component.scss']
})
export class CreateTenderFormComponent extends AbstractTenderComponent implements OnInit {

  createTenderForm: FormGroup = new FormGroup({
    dateStart: new FormControl(this.NEW_TENDER_DEFAULT_VALUE.DATE_START),
    dateEnd: new FormControl(this.NEW_TENDER_DEFAULT_VALUE.DATE_END),
    title: new FormControl(this.NEW_TENDER_DEFAULT_VALUE.TITLE, [
      Validators.required,
      Validators.minLength(this.NEW_TENDER_DEFAULT_VALUE.MIN_LENGTH_TITLE),
      Validators.maxLength(this.NEW_TENDER_DEFAULT_VALUE.MAX_LENGTH_TITLE)
    ]),
    description: new FormControl(this.NEW_TENDER_DEFAULT_VALUE.DESCRIPTION, [
      Validators.required,
      Validators.minLength(this.NEW_TENDER_DEFAULT_VALUE.MIN_LENGTH_DESCRIPTION),
      Validators.maxLength(this.NEW_TENDER_DEFAULT_VALUE.MAX_LENGTH_DESCRIPTION)
    ]),
    currency: new FormControl(this.NEW_TENDER_DEFAULT_VALUE.CURRENCY,
      [Validators.required]),
    isShowBestBet: new FormControl(this.NEW_TENDER_DEFAULT_VALUE.IS_SHOW_BEST_BET),
    expectedValue: new FormControl(this.NEW_TENDER_DEFAULT_VALUE.EXPECTED_VALUE,
      [Validators.required]),
    stepValue: new FormControl(this.NEW_TENDER_DEFAULT_VALUE.STEP_VALUE,
      [Validators.required]),
    quantity: new FormControl(this.NEW_TENDER_DEFAULT_VALUE.QUANTITY,
      [Validators.required]),
    unit: new FormControl(this.NEW_TENDER_DEFAULT_VALUE.UNIT,
      [Validators.required])
  });


  constructor(protected translateService: TranslateService,
              protected tenderService: TenderService,
              protected router: Router) {
    super(translateService, tenderService, router);
  }


  ngOnInit(): void {
    // super.ngOnInit();
  }


  onSubmit(): void {
    console.log(`this.createTenderForm =`);
    console.log(this.createTenderForm);
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


  /**  Prevent Saturday and Sunday from being selected in Material Datepicker  */
  disableRestDayFilter(d: Date | null): boolean {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  }


  minMaxMoneySetError(formControlName: string): void {
    const value: number = this.createTenderForm.value[formControlName];

    switch (true) {
      case value == null:
        this.createTenderForm.controls[formControlName].setErrors({
          required: true,
        });
        break;
      case value < this.NEW_TENDER_DEFAULT_VALUE.MIN_EXPECTED_VALUE:
        this.createTenderForm.controls[formControlName].setErrors({
          incorrectMinValue: true,
        });
        break;
      case value > this.NEW_TENDER_DEFAULT_VALUE.MAX_EXPECTED_VALUE:
        this.createTenderForm.controls[formControlName].setErrors({
          incorrectMaxValue: true,
        });
        break;
    }
  }

}
