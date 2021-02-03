import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import { AbstractTenderComponent } from '../../../shared/components/abstract-tender/abstract-tender.component';
import { TenderService } from '../../../tender.service';
import { Tender } from '../../../types/tender.type';
import { TenderCurrency } from '../../../types/tender-currency.type';
import { TenderUnit } from '../../../types/tender-unit.type';


@Component({
  selector: 'st-test-address-form',
  templateUrl: './create-tender-form.component.html',
  styleUrls: ['./create-tender-form.component.scss']
})
export class CreateTenderFormComponent extends AbstractTenderComponent {

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
              protected tenderService: TenderService) {
    super(translateService, tenderService);
  }


  onSubmit(): void {
    const tender: Tender = {
      dateCreate: new Date(),
      dateStart: this.createTenderForm.value.dateStart,
      dateEnd: this.createTenderForm.value.dateEnd,
      title: this.createTenderForm.value.title,
      description: this.createTenderForm.value.description,
      status: 'draft',
      isShowBestBet: this.createTenderForm.value.isShowBestBet,
      expectedValue: this.createTenderForm.value.expectedValue,
      stepValue: this.createTenderForm.value.stepValue,
      currency: this.createTenderForm.value.currency,
      quantity: this.createTenderForm.value.quantity,
      unit: this.createTenderForm.value.unit
    };

    this.subscriptions.add(
      this.tenderService.createTender(tender).subscribe(
        (newTender: Tender) => {
          const prefixMessage: string = this.translate('CREATE-FORM.NEW_TENDER');
          const suffixMessage: string = this.translate('CREATE-FORM.SUCCESSFULLY_CREATED');
          const message: string = prefixMessage + ' "' + newTender.title + '" ' + suffixMessage;
          this.tenderService.openSnackBar(message, this.SNACKBAR.SUCCESS);
        },
        () => {
          const message: string = this.translate('CREATE-FORM.ERROR.CREATE_SERVER_ERROR');
          this.tenderService.openSnackBar(message, this.SNACKBAR.ERROR);
        }
      ));
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
