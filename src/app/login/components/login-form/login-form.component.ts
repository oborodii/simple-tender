import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { TranslateService } from '@ngx-translate/core';

import { AbstractTenderComponent } from '../../../shared/components/abstract-tender/abstract-tender.component';
import { TenderService } from '../../../tender.service';
import { AuthService } from '../../../shared/services/auth.service';
import { TenderUser } from '../../../types/tender-user.type';
import { FirebaseAuthResponse } from '../../../types/firebase-response.type';


@Component({
  selector: 'st-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent extends AbstractTenderComponent implements OnInit {

  loading: boolean = false;
  isNeedAuth: boolean = false;

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
              protected router: Router,
              private route: ActivatedRoute
  ) {
    super(translateService, tenderService);
  }


  ngOnInit(): void {
    this.isShowWarningMessage();
  }


  onSubmit(): void {
    if (this.loginForm.valid) {
      const user: TenderUser = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      this.login(user);
    }
  }


  closeWarningMessage(): void {
    this.isNeedAuth = false;
  }


  private login(user: TenderUser): void {
    this.loading = true;

    this.subscriptions.add(
      this.authService.login(user).subscribe(
        (response: FirebaseAuthResponse) => {
          this.authService.setToken(response);
          this.loginSuccessHandler(response);
        },
        (error: HttpErrorResponse) => {
          this.authService.logout();
          this.loginErrorHandler(error);
        }
      ));
  }


  private loginSuccessHandler(response: FirebaseAuthResponse): void {
    this.router.navigate([this.ROUTER_URL.LIST]);
    this.loading = false;
  }


  private loginErrorHandler(error: HttpErrorResponse): void {
    const errorMessage: string = error.error.error.message;

    switch (true) {
      case errorMessage.includes(this.FIREBASE_ERROR_MESSAGE.EMAIL_NOT_FOUND):
        this.tenderService.openSnackBar(this.translate('FIREBASE.EMAIL_NOT_FOUND'));
        break;
      case errorMessage.includes(this.FIREBASE_ERROR_MESSAGE.INVALID_PASSWORD):
        this.tenderService.openSnackBar(this.translate('FIREBASE.INVALID_PASSWORD'));
        break;
      case errorMessage.includes(this.FIREBASE_ERROR_MESSAGE.TOO_MANY_ATTEMPTS):
        this.tenderService.openSnackBar(this.translate('FIREBASE.TOO_MANY_ATTEMPTS'));
        break;
      case errorMessage.includes(this.FIREBASE_ERROR_MESSAGE.USER_DISABLED):
        this.tenderService.openSnackBar(this.translate('FIREBASE.USER_DISABLED'));
        break;
      default:
        this.tenderService.openSnackBar(this.translate('FIREBASE.UNKNOWN_LOGIN_ERROR'));
    }

    this.loading = false;
  }


  private isShowWarningMessage(): void {
    this.subscriptions.add(
      this.route.queryParams.subscribe((params: Params) => {
          if (params) {
            if (params.needAuth || params.permissionDeniedUnauthorized) {
              this.isNeedAuth = true;
            }
          }
        }
      ));
  }

}
