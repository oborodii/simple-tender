import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { AbstractTenderComponent } from '../../../shared/components/abstract-tender/abstract-tender.component';
import { TenderService } from '../../../tender.service';


@Component({
  selector: 'st-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent extends AbstractTenderComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    login: new FormControl(null, [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(this.NEW_TENDER_DEFAULT_VALUE.MIN_LENGTH_TITLE),
    ])
  });

  constructor(protected translateService: TranslateService,
              protected tenderService: TenderService,
              protected router: Router) {
    super(translateService, tenderService, router);
  }

  onSubmit(): void {
    console.log(`this.loginForm =`);
    console.log(this.loginForm);
  }

}
