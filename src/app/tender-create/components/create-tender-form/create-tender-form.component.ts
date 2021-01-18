import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

import { ThemePalette } from '@angular/material/core';

import { AbstractTenderComponent } from '../../../shared/components/abstract-tender/abstract-tender.component';
import { TenderService } from '../../../tender.service';
import { TenderCurrency } from '../../../types/tender-currency.type';


@Component({
  selector: 'app-test-address-form',
  templateUrl: './create-tender-form.component.html',
  styleUrls: ['./create-tender-form.component.scss']
})
export class CreateTenderFormComponent extends AbstractTenderComponent implements OnInit {

  color: ThemePalette = 'primary';

  get currencies(): TenderCurrency[] {
    return this.tenderService.currencies;
  }

  createTenderForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    currency: new FormControl(this.currencies[0], [Validators.required]),
    isShowBestBet: new FormControl(true),
    expectedValue: new FormControl(100,
      [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
    stepValue: new FormControl(1,
      [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),

    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    postalCode: new FormControl(null,
      [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
    shipping: new FormControl('nextday', [Validators.required])
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
    console.log(`this.addressForm =`);
    console.log(this.createTenderForm);
  }

}
