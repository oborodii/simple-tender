import { ThemePalette } from '@angular/material/core';

import { TenderLocale } from './types/tender-locale.type';
import { NewTenderDefaultValue } from './types/new-tender-default-value.type';
import { TenderCurrency } from './types/tender-currency.type';
import { TenderUnit } from './types/tender-unit.type';


export class TenderConfig {

  /**  Possible color palette values: 'primary' | 'accent' | 'warn'  */
  protected readonly _currentThemePalette: ThemePalette = 'primary';

  /**  All locales in application  */
  protected readonly _LOCALE: TenderLocale = {
    UA: 'ua',
    EN: 'en',
  };

  /**  Min/Max value of the 'expectedValue' field when creating a new tender  */
  protected readonly _MIN_EXPECTED_VALUE: number = 1;
  protected readonly _MAX_EXPECTED_VALUE: number = 1000000000;

  /**  Min/Max value of the 'stepValue' field when creating a new tender  */
  protected readonly _MIN_STEP_VALUE: number = 1;
  protected readonly _MAX_STEP_VALUE: number = 1000000000;

  /**  Min/Max value of the 'quantity' field when creating a new tender  */
  protected readonly _MIN_QUANTITY: number = 1;
  protected readonly _MAX_QUANTITY: number = 1000000000;

  /**  Min/Max length of a new tender title */
  protected readonly _MIN_LENGTH_TITLE: number = 3;
  protected readonly _MAX_LENGTH_TITLE: number = 120;

  /**  Min/Max length of a new tender description */
  protected readonly _MIN_LENGTH_DESCRIPTION: number = 3;
  protected readonly _MAX_LENGTH_DESCRIPTION: number = 4000;

  /**  All currencies used in the application  */
  protected readonly _currencies: TenderCurrency[] = [
    {
      id: 1,
      code: '₴',
      nameUA: 'Українська гривня',
      nameEN: 'Ukrainian hryvnia'
    },
    {
      id: 2,
      code: '$',
      nameUA: 'Долар США',
      nameEN: 'U.S. dollar'
    },
    {
      id: 3,
      code: '€',
      nameUA: 'Євро',
      nameEN: 'Euro'
    }
  ];

  /**  In what units the goods are measured  */
  protected readonly _units: TenderUnit[] = [
    {
      id: 1,
      codeUA: 'кг',
      codeEN: 'kg',
      nameUA: 'кілограм',
      nameEN: 'kilogram'
    },
    {
      id: 2,
      codeUA: 'шт',
      codeEN: 'pcs',
      nameUA: 'штука',
      nameEN: 'piece'
    },
    {
      id: 3,
      codeUA: 'л',
      codeEN: 'L',
      nameUA: 'літр',
      nameEN: 'liter'
    },
    {
      id: 4,
      codeUA: 'м',
      codeEN: 'm',
      nameUA: 'метр',
      nameEN: 'meter'
    }
  ];

  /** Default values when creating a new tender  */
  protected readonly _NEW_TENDER_DEFAULT_VALUE: NewTenderDefaultValue = {
    DATE_START: '2021-01-21T22:06:02',
    DATE_END: '2021-01-21T22:06:02',
    TITLE: 'Test tender title',
    DESCRIPTION: null,
    CURRENCY: this._currencies[0],
    IS_SHOW_BEST_BET: true,
    EXPECTED_VALUE: 100,
    STEP_VALUE: 1,
    QUANTITY: 1,
    UNIT: this._units[0]
  };

}
