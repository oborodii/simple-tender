import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { TenderService } from '../../../services/tender.service';
import { AbstractTenderComponent } from '../abstract-tender/abstract-tender.component';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'st-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent extends AbstractTenderComponent {

  constructor(protected translateService: TranslateService,
              protected tenderService: TenderService,
              protected authService: AuthService
  ) {
    super(translateService, tenderService, authService);
  }


  get isUserAuth(): boolean {
    return this.authService.isUserAuth;
  }

}
