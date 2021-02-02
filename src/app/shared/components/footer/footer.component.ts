import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { TenderService } from '../../../tender.service';
import { AbstractTenderComponent } from '../abstract-tender/abstract-tender.component';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'st-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent extends AbstractTenderComponent implements OnInit {

  constructor(protected translateService: TranslateService,
              protected tenderService: TenderService,
              private authService: AuthService
  ) {
    super(translateService, tenderService);
  }


  ngOnInit(): void {
    // super.ngOnInit();
  }


  get isUserAuth(): boolean {
    return this.authService.isUserAuth;
  }

}
