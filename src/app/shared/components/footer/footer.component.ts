import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { TenderService } from '../../../tender.service';
import { AbstractTenderComponent } from '../abstract-tender/abstract-tender.component';


@Component({
  selector: 'st-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent extends AbstractTenderComponent implements OnInit {

  constructor(protected translateService: TranslateService,
              protected tenderService: TenderService,
              protected router: Router) {
    super(translateService, tenderService, router);
  }


  ngOnInit(): void {
    // super.ngOnInit();
  }

}
