import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';

import { TenderService } from '../../../services/tender.service';
import { AuthService } from '../../../services/auth.service';
import { AbstractTenderComponent } from '../abstract-tender/abstract-tender.component';


@Component({
  selector: 'st-vertical-menu',
  templateUrl: './vertical-menu.component.html',
  styleUrls: ['./vertical-menu.component.scss']
})
export class VerticalMenuComponent extends AbstractTenderComponent {

  constructor(protected tenderService: TenderService,
              protected translateService: TranslateService,
              protected authService: AuthService,
              protected title: Title,
              protected meta: Meta) {
    super(translateService, tenderService, authService, title, meta);
  }

}
