import { TenderCurrency } from './tender-currency.type';
import { TenderUnit } from './tender-unit.type';

export interface NewTenderDefaultValue {
  dateCreate?: number | Date;           // date of tender creation
  DATE_START: string | number | Date;    // launch date of the tender
  DATE_END: string | number | Date;      // end date of the tender
  timeStart?: string | number | Date;   // launch time of the tender
  timeEnd?: string | number | Date;     // end time of the tender
  TITLE: string | null;                 // title
  DESCRIPTION: string | null;           // description
  IS_SHOW_BEST_BET?: boolean;              // to show the best bet or not
  EXPECTED_VALUE?: number;               // expected amount
  STEP_VALUE?: number;                   // step of the bet
  CURRENCY: TenderCurrency;             // currency
  QUANTITY?: number;                    // quantity of goods
  UNIT?: TenderUnit;                    // in what units the goods are measured
}
