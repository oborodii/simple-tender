import { Component } from '@angular/core';

import { RouterUrl } from '../../../types/router-url.type';
import { TenderService } from '../../../services/tender.service';
import { MaterialIcons } from '../../../types/material-icons.type';


@Component({
  selector: 'st-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  get ROUTER_URL(): RouterUrl {
    return this.tenderService._ROUTER_URL;
  }

  get MATERIAL_ICON(): MaterialIcons {
    return this.tenderService._MATERIAL_ICON;
  }

  constructor(private tenderService: TenderService) {
  }

}
