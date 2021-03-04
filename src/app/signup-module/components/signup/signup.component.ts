import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Meta, Title } from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';

import { AbstractTenderComponent } from '../../../shared/components/abstract-tender/abstract-tender.component';
import { TenderService } from '../../../services/tender.service';
import { AuthService } from '../../../services/auth.service';
import { TenderUser } from '../../../types/tender-user.type';
import { FirebaseAuthResponse } from '../../../types/firebase-auth-response.type';


@Component({
  selector: 'st-sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent extends AbstractTenderComponent implements OnInit {

  loading: boolean = false;

  signupForm: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(this.LOGIN_DEFAULT_VALUE.MIN_PASSWORD_LENGTH),
      Validators.maxLength(this.LOGIN_DEFAULT_VALUE.MAX_PASSWORD_LENGTH),
    ]),
    companyName: new FormControl(null, [
      Validators.required
    ])
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
    this.setPageTitle('PAGE_TITLE.SIGNUP');
    this.setPageDescription('PAGE_DESCRIPTION.SIGNUP');
  }


  onSubmit(): void {
    if (this.signupForm.valid) {
      const user: TenderUser = {
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        displayName: this.signupForm.value.companyName,
      };

      this.signup(user);
    }
  }


  private signup(user: TenderUser): void {
    this.loading = true;

    this.subscriptions.add(
      this.authService.signup(user).subscribe(
        (response: FirebaseAuthResponse) => {
          this.authService.setToken(response);
          this.signupSuccessHandler();
        },
        (error: HttpErrorResponse) => {
          this.authService.logout();
          this.signupErrorHandler(error);
        }
      ));
  }


  private signupSuccessHandler(): void {
    this.router.navigate([this.ROUTER_URL.LIST]);
    this.loading = false;
  }


  private signupErrorHandler(error: HttpErrorResponse): void {
    const errorMessage: string = error.error.error.message;

    switch (true) {
      case errorMessage.includes(this.FIREBASE_ERROR_MESSAGE.EMAIL_EXISTS):
        this.tenderService.openSnackBar(this.translate('FIREBASE.EMAIL_EXISTS'));
        break;
      case errorMessage.includes(this.FIREBASE_ERROR_MESSAGE.OPERATION_NOT_ALLOWED):
        this.tenderService.openSnackBar(this.translate('FIREBASE.OPERATION_NOT_ALLOWED'));
        break;
      case errorMessage.includes(this.FIREBASE_ERROR_MESSAGE.TOO_MANY_ATTEMPTS):
        this.tenderService.openSnackBar(this.translate('FIREBASE.TOO_MANY_ATTEMPTS'));
        break;
      default:
        this.tenderService.openSnackBar(this.translate('FIREBASE.UNKNOWN_LOGIN_ERROR'));
    }

    this.loading = false;
  }

}
