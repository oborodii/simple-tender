import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import { AbstractTenderComponent } from '../../../shared/components/abstract-tender/abstract-tender.component';
import { TenderService } from '../../../services/tender.service';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'st-bet-create',
  templateUrl: './bet-create.component.html',
  styleUrls: ['./bet-create.component.scss']
})
export class BetCreateComponent extends AbstractTenderComponent implements OnInit {

  get currencyCode(): string {
    return this.selectedTender ? this.selectedTender.currency.code : this.NEW_TENDER_DEFAULT_VALUE.CURRENCY.code;
  }

  get defaultBetValue(): number {
    if (this.selectedTender) {
      if (this.selectedTender.bestBet) {
        return this.selectedTender.bestBet.value + this.selectedTender.stepValue;
      } else {
        return this.selectedTender.stepValue;
      }
    } else {
      return this.BET_DEFAULT_VALUE.VALUE;
    }
  }


  betForm: FormGroup = new FormGroup({
    betValue: new FormControl(this.defaultBetValue,
      [Validators.required]),
    comment: new FormControl(this.BET_DEFAULT_VALUE.COMMENT, [
      Validators.minLength(this.BET_DEFAULT_VALUE.MIN_COMMENT_LENGTH),
      Validators.maxLength(this.BET_DEFAULT_VALUE.MAX_COMMENT_LENGTH)
    ]),
  });


  constructor(protected translateService: TranslateService,
              protected tenderService: TenderService,
              private authService: AuthService
  ) {
    super(translateService, tenderService);
  }


  ngOnInit(): void {
  }


  onSubmit(): void {
  }


  setBetValueValidationError(): void {
    const currentBetValue: number = this.betForm.value.betValue;

    if (this.selectedTender) {
      switch (true) {
        case currentBetValue == null:
          this.betForm.controls.betValue.setErrors({
            required: true,
          });
          break;

        case this.selectedTender.bestBet && this.defaultBetValue < currentBetValue:
          this.betForm.controls.betValue.setErrors({
            lessBestBet: true,
          });
          break;

        case this.defaultBetValue > currentBetValue:
          this.betForm.controls.betValue.setErrors({
            lessStepValue: true,
          });
          break;

        case currentBetValue > this.BET_DEFAULT_VALUE.MAX_BET_VALUE:
          this.betForm.controls.betValue.setErrors({
            incorrectMaxValue: true,
          });
          break;
      }
    }
  }

}
