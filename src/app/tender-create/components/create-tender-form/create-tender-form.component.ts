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
    title: new FormControl(null,
      [Validators.required, Validators.minLength(3), Validators.maxLength(6)]),
    description: new FormControl(null,
      [Validators.required, Validators.minLength(3), Validators.maxLength(6)]),
    currency: new FormControl(this.currencies[0], [Validators.required]),
    isShowBestBet: new FormControl(true),
    expectedValue: new FormControl(100, [Validators.required]),
    stepValue: new FormControl(1, [Validators.required]),
    quantity: new FormControl(1, [Validators.required]),
    unit: new FormControl(this.units[0], [Validators.required])
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
      case value < this.MIN_MONEY_EXPECTED_VALUE:
        this.createTenderForm.controls[formControlName].setErrors({
          incorrectMinMoneyValue: true,
        });
        break;
      case value > this.MAX_MONEY_EXPECTED_VALUE:
        this.createTenderForm.controls[formControlName].setErrors({
          incorrectMaxMoneyValue: true,
        });
        break;
    }
  }

}
