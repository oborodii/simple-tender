import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { TenderUser } from '../../types/tender-user.type';
import { TenderConfig } from '../../tender.config';


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


  login(user: TenderUser): Observable<any> {
    return this.http.post(this._FIREBASE_LOGIN_URL, user).pipe(
      tap(this.setToken)
    );
  }


  logout(): void {
  }


  isUserAuth(): boolean {
    return Boolean(this.token);
  }


  private setToken(res: any): void {
    console.log(`setToken res = `);
    console.log(res);
  }

}
