import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';

import { TenderService } from '../../../services/tender.service';
import { AuthService } from '../../../services/auth.service';
import { AbstractTenderComponent } from '../abstract-tender/abstract-tender.component';


@Component({
  selector: 'st-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent extends AbstractTenderComponent implements OnInit {

  constructor(protected translateService: TranslateService,
              protected tenderService: TenderService,
              protected authService: AuthService,
              protected title: Title,
              protected meta: Meta) {
    super(translateService, tenderService, authService, title, meta);
  }

  ngOnInit(): void {
    this.setPageTitle('PAGE_TITLE.NOT_FOUND');
    this.setPageDescription('PAGE_DESCRIPTION.NOT_FOUND');
  }

}
