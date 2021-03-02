import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { TenderService } from '../../services/tender.service';
import { FirebaseErrorMessage } from '../../types/firebase-error-message.type';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  get FIREBASE_ERROR_MESSAGE(): FirebaseErrorMessage {
    return this.tenderService._FIREBASE_ERROR_MESSAGE;
  }

  constructor(private authService: AuthService,
              private tenderService: TenderService,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isUserAuth) {
      request = request.clone({
        setParams: {
          auth: String(this.authService.getToken())
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.error && err.error.error) {
          const isInvalidRefreshToken: boolean = err.error.error.message === this.FIREBASE_ERROR_MESSAGE.INVALID_REFRESH_TOKEN;
          const isInvalidToken: boolean = err.error.error.message === this.FIREBASE_ERROR_MESSAGE.INVALID_ID_TOKEN;

          if (err.status === 401 || isInvalidRefreshToken || isInvalidToken) {
            this.authService.logout();
            const url: string = '/' + environment.routerPath.login;
            this.router.navigate([url], {
              queryParams: {
                permissionDeniedUnauthorized: true
              }
            });
          }
        }

        return throwError(err);
      })
    );
  }

}
