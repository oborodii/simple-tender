import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

import { AbstractTenderComponent } from '../abstract-tender/abstract-tender.component';
import { TenderService } from '../../../tender.service';


@Component({
  selector: 'st-language-toggle',
  templateUrl: './language-toggle.component.html',
  styleUrls: ['./language-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageToggleComponent extends AbstractTenderComponent {

  constructor(protected translateService: TranslateService,
              protected tenderService: TenderService,
              protected router: Router) {
    super(translateService, tenderService);
  }


  selectionChange(language: string): void {
    this.currentLocale = language;
    this.translateService.use(language);
    this.translateService.setDefaultLang(language);
    localStorage.setItem('locale', language);

    const currentUrl: string = this.router.url;
    this.router.navigate([currentUrl, '#']).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

}
