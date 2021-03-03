import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '../../../services/auth.service';
import { TenderService } from '../../../services/tender.service';
import { AbstractTenderComponent } from '../abstract-tender/abstract-tender.component';


@Component({
  selector: 'st-auth-user-menu',
  templateUrl: './auth-user-menu.component.html',
  styleUrls: ['./auth-user-menu.component.scss']
})
export class AuthUserMenuComponent extends AbstractTenderComponent {

  get companyName(): string | null {
    const result: string | null = localStorage.getItem(this.FIREBASE.LOCAL_STORAGE_USER_DISPLAY_NAME);
    return result ? result : null;
  }

  constructor(protected tenderService: TenderService,
              protected translateService: TranslateService,
              protected authService: AuthService,
              private router: Router) {
    super(translateService, tenderService, authService);
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate([this.ROUTER_URL.LOGIN]);
  }

}
