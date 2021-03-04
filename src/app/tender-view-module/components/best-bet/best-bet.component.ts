import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';

import { TenderService } from '../../../services/tender.service';
import { AuthService } from '../../../services/auth.service';
import { TenderBet } from '../../../types/tender-bet.type';
import { AbstractTenderComponent } from '../../../shared/components/abstract-tender/abstract-tender.component';


@Component({
  selector: 'st-best-bet',
  templateUrl: './best-bet.component.html',
  styleUrls: ['./best-bet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BestBetComponent extends AbstractTenderComponent {

  @Input() bestBet: TenderBet;
  @Input() currencyCode: string;

  constructor(protected translateService: TranslateService,
              protected tenderService: TenderService,
              protected authService: AuthService,
              protected title: Title,
              protected meta: Meta,
              protected router: Router) {
    super(translateService, tenderService, authService, title, meta);
  }

}
