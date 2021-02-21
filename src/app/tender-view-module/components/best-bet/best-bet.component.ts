import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { TenderBet } from '../../../types/tender-bet.type';


@Component({
  selector: 'st-best-bet',
  templateUrl: './best-bet.component.html',
  styleUrls: ['./best-bet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BestBetComponent {

  @Input() bestBet: TenderBet;
  @Input() currencyCode: string;

  constructor() {
  }

}
