import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { AbstractTenderComponent } from '../../../shared/components/abstract-tender/abstract-tender.component';
import { TenderService } from '../../../tender.service';


@Component({
  selector: 'app-test-address-form',
  templateUrl: './create-tender-form.component.html',
  styleUrls: ['./create-tender-form.component.scss']
})
export class CreateTenderFormComponent extends AbstractTenderComponent implements OnInit {

  createTenderForm: FormGroup = new FormGroup({
    title: new FormControl(this.NEW_TENDER_DEFAULT_VALUE.TITLE, [
      Validators.required,
      Validators.minLength(this.MIN_LENGTH_TITLE),
      Validators.maxLength(this.MAX_LENGTH_TITLE)
    ]),
    description: new FormControl(this.NEW_TENDER_DEFAULT_VALUE.DESCRIPTION, [
      Validators.required,
      Validators.minLength(this.MIN_LENGTH_DESCRIPTION),
      Validators.maxLength(this.MAX_LENGTH_DESCRIPTION)
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


  minMaxMoneySetError(formControlName: string): void {
    const value: number = this.createTenderForm.value[formControlName];

    switch (true) {
      case value == null:
        this.createTenderForm.controls[formControlName].setErrors({
          required: true,
        });
        break;
      case value < this.MIN_EXPECTED_VALUE:
        this.createTenderForm.controls[formControlName].setErrors({
          incorrectMinValue: true,
        });
        break;
      case value > this.MAX_EXPECTED_VALUE:
        this.createTenderForm.controls[formControlName].setErrors({
          incorrectMaxValue: true,
        });
        break;
    }
  }

}
