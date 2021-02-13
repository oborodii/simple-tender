import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TenderConfig } from '../tender.config';
import { TenderUser } from '../types/tender-user.type';
import { FirebaseAuthResponse } from '../types/firebase-response.type';
import { ResponseFirebaseUserPayload } from '../types/response-firebase-user-payload.type';


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


  /** Get one User by its id from users.json */
  getCurrentUser(): Observable<TenderUser | null> {
    const idToken: string | null = localStorage.getItem(this._FIREBASE.LOCAL_STORAGE_TOKEN_NAME);

    return this.http.post<any>(this._FIREBASE_GET_USER_DATA_URL, {idToken}).pipe(
      map((response: ResponseFirebaseUserPayload) => {
        if (response) {
          const user: TenderUser = response.users[0];
          user.createdAt = new Date(Number(user.createdAt));
          user.lastLoginAt = new Date(Number(user.lastLoginAt));
          user.passwordUpdatedAt = new Date(Number(user.passwordUpdatedAt));
          user.validSince = new Date(Number(user.validSince));
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
      const expiresDate: Date = new Date(tokenFromLocalStorage);
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
      const tokenExpiresInMs: number = Number(response.expiresIn) * 1000;
      const expiresDate: number = new Date().getTime() + tokenExpiresInMs;

      localStorage.setItem(this._FIREBASE.LOCAL_STORAGE_TOKEN_NAME, response.idToken);
      localStorage.setItem(this._FIREBASE.LOCAL_STORAGE_EXPIRES_TOKEN_NAME, String(expiresDate));
    } else {
      localStorage.removeItem(this._FIREBASE.LOCAL_STORAGE_TOKEN_NAME);
      localStorage.removeItem(this._FIREBASE.LOCAL_STORAGE_EXPIRES_TOKEN_NAME);
    }
  }

}