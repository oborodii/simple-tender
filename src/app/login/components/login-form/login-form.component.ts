import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { TranslateService } from '@ngx-translate/core';

import { AbstractTenderComponent } from '../../../shared/components/abstract-tender/abstract-tender.component';
import { TenderService } from '../../../tender.service';
import { AuthService } from '../../../shared/services/auth.service';
import { TenderUser } from '../../../types/tender-user.type';


@Component({
  selector: 'st-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent extends AbstractTenderComponent implements OnInit, OnDestroy {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(this.LOGIN_DEFAULT_VALUE.EMAIL, [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl(this.LOGIN_DEFAULT_VALUE.PASSWORD, [
      Validators.required,
      Validators.minLength(this.LOGIN_DEFAULT_VALUE.MIN_PASSWORD_LENGTH),
      Validators.maxLength(this.LOGIN_DEFAULT_VALUE.MAX_PASSWORD_LENGTH),
    ])
  });


  constructor(protected translateService: TranslateService,
              protected tenderService: TenderService,
              private authService: AuthService,
              protected router: Router) {
    super(translateService, tenderService, router);
  }


  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(`this.loginForm =`);
      console.log(this.loginForm);

      const user: TenderUser = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.login(user);
    }
  }


  private login(user: TenderUser): void {
    this.subscriptions.add(
      this.authService.login(user).subscribe(
        (response: any) => {
          console.log(`response =`);
          console.log(response);
          this.router.navigate(['/list']);
        },
        (error: HttpErrorResponse) => {
          const errorMessage: string = error.error.error.message;

          switch (true) {
            case errorMessage.includes(this.FIREBASE_ERROR_MESSAGE.EMAIL_NOT_FOUND):
              console.log(`EMAIL_NOT_FOUND = `);
              console.log(error);
              break;
            case errorMessage.includes(this.FIREBASE_ERROR_MESSAGE.INVALID_PASSWORD):
              console.log(`INVALID_PASSWORD = `);
              console.log(error);
              break;
            case errorMessage.includes(this.FIREBASE_ERROR_MESSAGE.TOO_MANY_ATTEMPTS):
              console.log(`TOO_MANY_ATTEMPTS_TRY_LATER = `);
              console.log(error);
              break;
            default:
              console.log(`Unknown login error`);
              console.log(error);
          }
        }
      ));
  }


  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
