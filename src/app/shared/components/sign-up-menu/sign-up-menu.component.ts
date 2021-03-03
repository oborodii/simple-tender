import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { AbstractTenderComponent } from '../abstract-tender/abstract-tender.component';
import { TenderService } from '../../../services/tender.service';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'st-sign-up-menu',
  templateUrl: './sign-up-menu.component.html',
  styleUrls: ['./sign-up-menu.component.scss']
})
export class SignUpMenuComponent extends AbstractTenderComponent {

  constructor(protected tenderService: TenderService,
              protected translateService: TranslateService,
              protected authService: AuthService) {
    super(translateService, tenderService, authService);
  }

}
