import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ThemePalette } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '../../../../environments/environment';
import { TenderService } from '../../../services/tender.service';
import { AuthService } from '../../../services/auth.service';
import { AbstractTenderComponent } from '../abstract-tender/abstract-tender.component';
import { FirebaseRefreshTokenResponse } from '../../../types/firebase-refresh-token-response.type';
import { FirebaseAuthResponse } from '../../../types/firebase-auth-response.type';


@Component({
  selector: 'st-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent extends AbstractTenderComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  get isUserAuth(): boolean {
    return this.authService.isUserAuth;
  }

  get currentThemePalette(): ThemePalette {
    return this.tenderService._currentThemePalette;
  }


  constructor(protected tenderService: TenderService,
              protected translateService: TranslateService,
              protected authService: AuthService,
              private breakpointObserver: BreakpointObserver,
              private router: Router
  ) {
    super(translateService, tenderService, authService);
  }


  ngOnInit(): void {
    this.translateService.use(environment.defaultLocale);
    this.refreshTokenByTimer();
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate([this.ROUTER_URL.LOGIN]);
  }


  private refreshTokenByTimer(): void {
    // How often to check if the token has expired (in milliseconds):
    const TIMER_PERIOD_MS: number = 540000;           // 9 min

    // Token lifetime limit, after which you need to get a new token (in milliseconds):
    const TOKEN_EXPIRES_LIMIT_MS: number = 1200000;   // 20 min

    this.subscriptions.add(
      timer(0, TIMER_PERIOD_MS).pipe(
        switchMap(() => {
          const refreshToken: string | null = localStorage.getItem(this.FIREBASE.LOCAL_STORAGE_REFRESH_TOKEN_NAME);
          const expiresDateInLocalStorage: string | null = localStorage.getItem(this.FIREBASE.LOCAL_STORAGE_EXPIRES_TOKEN_NAME);

          if (refreshToken && expiresDateInLocalStorage) {
            const currentDate: Date = new Date();
            const expiresDate: Date = new Date(Number(expiresDateInLocalStorage));

            // If token expires in 'TOKEN_EXPIRES_LIMIT_MS' milliseconds:
            const millisecondsLeft: number = expiresDate.getTime() - currentDate.getTime();
            if (millisecondsLeft < TOKEN_EXPIRES_LIMIT_MS) {
              return this.authService.refreshToken(refreshToken);
            } else {
              return of(null);
            }
          } else {
            return of(null);
          }
        })).subscribe((response: FirebaseRefreshTokenResponse | null) => {
        if (response) {
          this.saveTokenInLocalStorage(response);
        }
      }));
  }


  private saveTokenInLocalStorage(refreshResponse: FirebaseRefreshTokenResponse): void {
    const params: FirebaseAuthResponse = {
      idToken: refreshResponse.id_token,             // a Firebase Auth ID token for the authenticated user
      refreshToken: refreshResponse.refresh_token,   // a Firebase Auth refresh token for the authenticated user
      expiresIn: refreshResponse.expires_in,         // the number of seconds in which the ID token expires
    };
    this.authService.setToken(params);
  }

}
