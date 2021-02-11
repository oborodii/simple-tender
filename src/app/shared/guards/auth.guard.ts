import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isUserAuth) {
      return true;
    } else {
      this.authService.logout();

      const url: string = '/' + environment.router_login_url;
      this.router.navigate([url], {
        queryParams: {
          needAuth: true
        }
      });
      return false;
    }
  }

}
