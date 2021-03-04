import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '../../../services/auth.service';
import { TenderService } from '../../../services/tender.service';
import { AbstractTenderComponent } from '../abstract-tender/abstract-tender.component';
import { TenderUser } from '../../../types/tender-user.type';


@Component({
  selector: 'st-auth-user-menu',
  templateUrl: './auth-user-menu.component.html',
  styleUrls: ['./auth-user-menu.component.scss']
})
export class AuthUserMenuComponent extends AbstractTenderComponent implements OnInit {

  companyName: string;

  constructor(protected tenderService: TenderService,
              protected translateService: TranslateService,
              protected authService: AuthService,
              private router: Router) {
    super(translateService, tenderService, authService);
  }


  ngOnInit(): void {
    this.getAuthUser();
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate([this.ROUTER_URL.LOGIN]);
  }


  private getAuthUser(): void {
    const userDisplayName: string | null = localStorage.getItem(this.FIREBASE.LOCAL_STORAGE_USER_DISPLAY_NAME);

    if (userDisplayName) {
      this.companyName = userDisplayName;
    } else {
      this.authService.getAuthUser().subscribe((authUser: TenderUser | null) => {
        if (authUser && authUser.displayName) {
          this.companyName = authUser.displayName;
          localStorage.setItem(this.FIREBASE.LOCAL_STORAGE_USER_DISPLAY_NAME, this.companyName);
        }
      });
    }
  }

}
