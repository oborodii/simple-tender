import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { TranslateService } from '@ngx-translate/core';

import { AbstractTenderComponent } from '../../../shared/components/abstract-tender/abstract-tender.component';
import { TenderService } from '../../../tender.service';
import { AuthService } from '../../../shared/services/auth.service';
import { TenderUser } from '../../../types/tender-user.type';
import { FirebaseAuthResponse } from '../../../types/firebase-response.type';


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
    name: new FormControl(null, [
      Validators.required
    ]),
    surname: new FormControl(null, [
      Validators.required
    ]),
    phone: new FormControl(null, [
      Validators.pattern('[- +()0-9]{6,}')
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
  }


  onSubmit(): void {
    if (this.signupForm.valid) {
      const user: TenderUser = {
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        displayName: this.signupForm.value.name + '' + this.signupForm.value.surname,
        name: this.signupForm.value.name,           // TODO: delete
        surname: this.signupForm.value.surname,     // TODO: delete
        phone: this.signupForm.value.phone
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
          this.signupSuccessHandler(response);
        },
        (error: HttpErrorResponse) => {
          this.authService.logout();
          this.signupErrorHandler(error);
        }
      ));
  }


  private signupSuccessHandler(response: FirebaseAuthResponse): void {
    console.log(`FirebaseAuthResponse =`);
    console.log(response);
    this.router.navigate(['/list']);
    this.loading = false;
  }


  private signupErrorHandler(error: HttpErrorResponse): void {
    const errorMessage: string = error.error.error.message;

    switch (true) {
      case errorMessage.includes(this.FIREBASE_ERROR_MESSAGE.EMAIL_EXISTS):
        this.tenderService.openSnackBar(this.translate('LOGIN.FIREBASE_EMAIL_EXISTS'));
        break;
      case errorMessage.includes(this.FIREBASE_ERROR_MESSAGE.OPERATION_NOT_ALLOWED):
        this.tenderService.openSnackBar(this.translate('LOGIN.FIREBASE_OPERATION_NOT_ALLOWED'));
        break;
      case errorMessage.includes(this.FIREBASE_ERROR_MESSAGE.TOO_MANY_ATTEMPTS):
        this.tenderService.openSnackBar(this.translate('LOGIN.FIREBASE_TOO_MANY_ATTEMPTS'));
        break;
      default:
        this.tenderService.openSnackBar(this.translate('LOGIN.FIREBASE_UNKNOWN_LOGIN_ERROR'));
    }

    this.loading = false;
  }

}
