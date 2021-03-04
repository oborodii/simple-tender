import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { map, switchMap } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

import { AbstractTenderComponent } from '../../../shared/components/abstract-tender/abstract-tender.component';
import { TenderService } from '../../../services/tender.service';
import { AuthService } from '../../../services/auth.service';
import { Tender } from '../../../types/tender.type';
import { TenderCurrency } from '../../../types/tender-currency.type';
import { TenderUnit } from '../../../types/tender-unit.type';
import { TenderUser } from '../../../types/tender-user.type';


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
    stepValue: new FormControl(this.NEW_TENDER_DEFAULT_VALUE.STEP_VALUE,
      [Validators.required]),
    quantity: new FormControl(this.NEW_TENDER_DEFAULT_VALUE.QUANTITY,
      [Validators.required]),
    unit: new FormControl(this.NEW_TENDER_DEFAULT_VALUE.UNIT,
      [Validators.required])
  });


  constructor(protected translateService: TranslateService,
              protected tenderService: TenderService,
              protected authService: AuthService,
              protected title: Title,
              protected meta: Meta,
              protected router: Router) {
    super(translateService, tenderService, authService, title, meta);
  }


  ngOnInit(): void {
    this.setPageTitle('PAGE_TITLE.CREATE_TENDER');
    this.setPageDescription('PAGE_DESCRIPTION.CREATE_TENDER');
  }


  onSubmit(): void {
    const tender: Tender = {
      dateStart: this.createTenderForm.value.dateStart,
      dateEnd: this.createTenderForm.value.dateEnd,
      title: this.createTenderForm.value.title,
      description: this.createTenderForm.value.description,
      isShowBestBet: this.createTenderForm.value.isShowBestBet,
      stepValue: this.createTenderForm.value.stepValue,
      currency: this.createTenderForm.value.currency,
      quantity: this.createTenderForm.value.quantity,
      unit: this.createTenderForm.value.unit,
      bets: []
    };

    this.createTenderByCurrentUser(tender);
  }


  getLocalCurrencyName(currency: TenderCurrency): string {
    return this.tenderService.getLocalCurrencyName(currency);
  }


  getLocalUnitCode(unit: TenderUnit): string {
    return this.tenderService.getLocalUnitCode(unit);
  }


  getLocalUnitFullName(unit: TenderUnit): string {
    return this.tenderService.getLocalUnitFullName(unit);
  }


  minMaxSetError(formControlName: string): void {
    const value: number = this.createTenderForm.value[formControlName];

    switch (true) {
      case value == null:
        this.createTenderForm.controls[formControlName].setErrors({
          required: true,
        });
        break;
      case value < this.NEW_TENDER_DEFAULT_VALUE.MIN_STEP_VALUE:
        this.createTenderForm.controls[formControlName].setErrors({
          incorrectMinValue: true,
        });
        break;
      case value > this.NEW_TENDER_DEFAULT_VALUE.MAX_STEP_VALUE:
        this.createTenderForm.controls[formControlName].setErrors({
          incorrectMaxValue: true,
        });
        break;
    }
  }


  private createTenderByCurrentUser(tender: Tender): void {
    this.subscriptions.add(
      this.authService.getAuthUser().pipe(
        map((user: TenderUser | null) => tender.user = user),
        switchMap(() => this.tenderService.createTender(tender))
      ).subscribe((newTender: Tender) => {
          const prefixMessage: string = this.translate('CREATE-FORM.NEW_TENDER');
          const suffixMessage: string = this.translate('CREATE-FORM.SUCCESSFULLY_CREATED');
          const message: string = prefixMessage + ' "' + newTender.title + '" ' + suffixMessage;
          this.tenderService.openSnackBar(message, this.SNACKBAR.SUCCESS);
          if (newTender) {
            this.router.navigate([this.ROUTER_URL.VIEW, newTender.id]);
          }
        },
        () => {
          const message: string = this.translate('CREATE-FORM.ERROR.CREATE_SERVER_ERROR');
          this.tenderService.openSnackBar(message, this.SNACKBAR.ERROR);
        }
      ));
  }

}
