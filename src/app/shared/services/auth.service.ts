import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TenderUser } from '../../types/tender-user.type';
import { TenderConfig } from '../../tender.config';
import { FirebaseAuthResponse } from '../../types/firebase-response.type';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends TenderConfig {

  get token(): string | null {
    const tokenFromLocalStorage: string = JSON.stringify(localStorage.getItem(this._FIREBASE.LOCAL_STORAGE_EXPIRES_TOKEN_NAME));
    const expiresDate: Date = new Date(tokenFromLocalStorage);

    if (new Date() > expiresDate) {
      this.logout();
      return null;
    }

    return JSON.stringify(localStorage.getItem(this._FIREBASE.LOCAL_STORAGE_TOKEN_NAME));
  }


  constructor(private http: HttpClient) {
    super();
  }


  login(user: TenderUser): Observable<FirebaseAuthResponse> {
    // whether or not to return an ID and refresh token
    // (should always be true for Firebase)
    user.returnSecureToken = true;

    return this.http.post<FirebaseAuthResponse>(this._FIREBASE_LOGIN_URL, user);
  }


  logout(): void {
    this.setToken(null);
  }


  isUserAuth(): boolean {
    return Boolean(this.token);
  }


  private setToken(response: FirebaseAuthResponse | null): void {
    if (response) {
      const tokenExpiresInMs: number = Number(response.expiresIn) * 1000;
      const expiresDate: number = new Date().getTime() + tokenExpiresInMs;

      localStorage.setItem(this._FIREBASE.LOCAL_STORAGE_TOKEN_NAME, response.idToken);
      localStorage.setItem(this._FIREBASE.LOCAL_STORAGE_EXPIRES_TOKEN_NAME, String(expiresDate));
    } else {
      localStorage.clear();
    }
  }

}
