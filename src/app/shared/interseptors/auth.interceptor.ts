import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private router: Router
  ) {
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
        console.log(`Interceptor Error = `);
        console.log(err);

        if (err.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login'], {
            queryParams: {
              permissionDeniedUnauthorized: true
            }
          });
        }

        return throwError(err);
      })
    );
  }

}
