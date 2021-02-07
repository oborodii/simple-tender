import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { AbstractTenderComponent } from '../../../shared/components/abstract-tender/abstract-tender.component';
import { TenderService } from '../../../tender.service';


@Component({
  selector: 'st-selected-tender',
  templateUrl: './selected-tender.component.html',
  styleUrls: ['./selected-tender.component.scss']
})
export class SelectedTenderComponent extends AbstractTenderComponent implements OnInit {

  constructor(protected translateService: TranslateService,
              protected tenderService: TenderService,
              private route: ActivatedRoute) {
    super(translateService, tenderService);
  }

  ngOnInit(): void {
    console.log(this.route.params.subscribe((data: Params) => {
      console.log(`data =`);
      console.log(data);
    }));
  }


}
