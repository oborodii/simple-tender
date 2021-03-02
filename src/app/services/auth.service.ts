import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { TenderConfig } from '../tender.config';
import { TenderUser } from '../types/tender-user.type';
import { FirebaseAuthResponse } from '../types/firebase-auth-response.type';
import { ResponseFirebaseUserPayload } from '../types/response-firebase-user-payload.type';
import { FirebaseRefreshTokenResponse } from '../types/firebase-refresh-token-response.type';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends TenderConfig {

  get isUserAuth(): boolean {
    return Boolean(this.getToken());
  }

  constructor(private http: HttpClient,
              private router: Router) {
    super();
  }


  /** Create a new email and password user by issuing an HTTP POST request */
  signup(user: TenderUser): Observable<FirebaseAuthResponse> {
    // whether or not to return an ID and refresh token
    // (should always be true for Firebase)
    user.returnSecureToken = true;
    return this.http.post<FirebaseAuthResponse>(this._FIREBASE_SIGNUP_URL, user);
  }


  login(user: TenderUser): Observable<FirebaseAuthResponse> {
    user.returnSecureToken = true;
    return this.http.post<FirebaseAuthResponse>(this._FIREBASE_LOGIN_URL, user);
  }


  logout(): void {
    this.setToken(null);
  }


  navigateToMainPage(): void {
    const url: string = '/' + environment.router_login_url;
    this.router.navigate([url], {
      queryParams: {
        needAuth: true
      }
    });
  }


  /** Get already registered User */
  getAuthUser(): Observable<TenderUser | null> {
    const idToken: string | null = localStorage.getItem(this._FIREBASE.LOCAL_STORAGE_TOKEN_NAME);

    return this.http.post<ResponseFirebaseUserPayload>(this._FIREBASE_GET_USER_DATA_URL, {idToken}).pipe(
      map((response: ResponseFirebaseUserPayload) => {
        if (response) {
          const user: TenderUser = response.users[0];

          user.createdAt = new Date(Number(user.createdAt));
          user.lastLoginAt = new Date(Number(user.lastLoginAt));
          delete user.passwordUpdatedAt;
          delete user.validSince;
          delete user.emailVerified;
          delete user.lastRefreshAt;
          delete user.passwordHash;
          delete user.passwordUpdatedAt;
          delete user.providerUserInfo;
          delete user.validSince;

          return user;
        } else {
          return null;
        }
      })
    );
  }


  getToken(): string | null {
    const tokenFromLocalStorage: string | null = localStorage.getItem(this._FIREBASE.LOCAL_STORAGE_EXPIRES_TOKEN_NAME);

    if (tokenFromLocalStorage) {
      const expiresDate: Date = new Date(Number(tokenFromLocalStorage));
      if (new Date() > expiresDate) {
        this.logout();
        this.router.navigate([this._ROUTER_URL.LOGIN]);
        return null;
      }
      return localStorage.getItem(this._FIREBASE.LOCAL_STORAGE_TOKEN_NAME);
    } else {
      return null;
    }
  }


  setToken(response: FirebaseAuthResponse | null): void {
    if (response) {
      if (response.expiresIn) {
        const tokenExpiresInMs: number = Number(response.expiresIn) * 1000;
        const expiresDate: number = new Date().getTime() + tokenExpiresInMs;
        localStorage.setItem(this._FIREBASE.LOCAL_STORAGE_EXPIRES_TOKEN_NAME, String(expiresDate));
      }
      if (response.idToken) {
        localStorage.setItem(this._FIREBASE.LOCAL_STORAGE_TOKEN_NAME, response.idToken);
      }
      if (response.refreshToken) {
        localStorage.setItem(this._FIREBASE.LOCAL_STORAGE_REFRESH_TOKEN_NAME, response.refreshToken);
      }
      if (response.email) {
        localStorage.setItem(this._FIREBASE.LOCAL_STORAGE_USER_EMAIL_NAME, response.email);
      }
      if (response.displayName) {
        localStorage.setItem(this._FIREBASE.LOCAL_STORAGE_USER_DISPLAY_NAME, String(response.displayName));
      }
    } else {
      localStorage.removeItem(this._FIREBASE.LOCAL_STORAGE_EXPIRES_TOKEN_NAME);
      localStorage.removeItem(this._FIREBASE.LOCAL_STORAGE_TOKEN_NAME);
      localStorage.removeItem(this._FIREBASE.LOCAL_STORAGE_REFRESH_TOKEN_NAME);
      localStorage.removeItem(this._FIREBASE.LOCAL_STORAGE_USER_EMAIL_NAME);
      localStorage.removeItem(this._FIREBASE.LOCAL_STORAGE_USER_DISPLAY_NAME);
    }
  }


  refreshToken(refreshToken: string): Observable<FirebaseRefreshTokenResponse | null> {
    if (refreshToken) {
      return this.http.post<FirebaseRefreshTokenResponse>(this._FIREBASE_REFRESH_TOKEN_URL, {
        grant_type: this._FIREBASE.REFRESH_TOKEN_GRANT_TYPE_NAME,
        refresh_token: refreshToken
      });
    } else {
      return of(null);
    }
  }

}
