import { TenderCurrency } from './tender-currency.type';
import { TenderUnit } from './tender-unit.type';

export interface NewTenderDefaultValue {
  /** Min/Max value of the 'expectedValue' field when creating a new tender */
  readonly MIN_EXPECTED_VALUE: number;
  readonly MAX_EXPECTED_VALUE: number;

  /** Min/Max value of the 'stepValue' field when creating a new tender */
  readonly MIN_STEP_VALUE: number;
  readonly MAX_STEP_VALUE: number;

  /** Min/Max value of the 'quantity' field when creating a new tender */
  readonly MIN_QUANTITY: number;
  readonly MAX_QUANTITY: number;

  /** Min/Max length of a new tender title */
  readonly MIN_LENGTH_TITLE: number;
  readonly MAX_LENGTH_TITLE: number;

  /** Min/Max length of a new tender description */
  readonly MIN_LENGTH_DESCRIPTION: number;
  readonly MAX_LENGTH_DESCRIPTION: number;

  /** Launch date of the tender */
  readonly DATE_START: string | Date;

  /** End date of the tender */
  readonly DATE_END: string | Date;

  /** Tender title */
  readonly TITLE: string | null;

  /** Tender description */
  readonly DESCRIPTION: string | null;

  /** Default currency */
  readonly CURRENCY: TenderCurrency;

  /** Expected amount */
  readonly EXPECTED_VALUE: number;

  /** Step of the bet */
  readonly STEP_VALUE: number;

  /** Quantity of goods */
  readonly QUANTITY: number;

  /** In what units the goods are measured */
  readonly UNIT: TenderUnit;

  /** To show the best bet or not */
  readonly IS_SHOW_BEST_BET: boolean;
}
