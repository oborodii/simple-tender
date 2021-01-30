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

  get token(): string {
    return '';
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
  }


  isUserAuth(): boolean {
    return Boolean(this.token);
  }


  private setToken(res: FirebaseAuthResponse): void {
    console.log(`setToken res = `);
    console.log(res);
  }

}
