import { ThemePalette } from '@angular/material/core';

import { environment } from '../environments/environment';
import { TenderLocale } from './types/tender-locale.type';
import { NewTenderDefaultValue } from './types/new-tender-default-value.type';
import { TenderCurrency } from './types/tender-currency.type';
import { TenderUnit } from './types/tender-unit.type';
import { LoginDefaultValue } from './types/login-default-value.type';
import { FirebaseErrorMessage } from './types/firebase-error-message.type';
import { SnackBarTxtColor } from './types/snack-bar-txt-color.type';


export class TenderConfig {

  /** URLs */
  readonly _FIREBASE_LOGIN_URL: string = environment.firebase_login_url + environment.apiKey;

  /** Possible color palette values: 'primary' | 'accent' | 'warn' */
  readonly _currentThemePalette: ThemePalette = 'primary';

  /** All locales in application */
  readonly _LOCALE: TenderLocale = {
    UA: 'ua',
    EN: 'en',
  };

  /** All currencies used in the application */
  readonly _currencies: TenderCurrency[] = [
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

  /** In what units the goods are measured */
  readonly _units: TenderUnit[] = [
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

  /** Default values when creating a new tender */
  readonly _NEW_TENDER_DEFAULT_VALUE: NewTenderDefaultValue = {
    /** Min/Max value of the 'expectedValue' field when creating a new tender */
    MIN_EXPECTED_VALUE: 1,
    MAX_EXPECTED_VALUE: 1000000000,

    /** Min/Max value of the 'stepValue' field when creating a new tender */
    MIN_STEP_VALUE: 1,
    MAX_STEP_VALUE: 1000000000,

    /** Min/Max value of the 'quantity' field when creating a new tender */
    MIN_QUANTITY: 1,
    MAX_QUANTITY: 1000000000,

    /** Min/Max length of a new tender title */
    MIN_LENGTH_TITLE: 3,
    MAX_LENGTH_TITLE: 120,

    /** Min/Max length of a new tender description */
    MIN_LENGTH_DESCRIPTION: 3,
    MAX_LENGTH_DESCRIPTION: 4000,

    /** Launch date of the tender */
    DATE_START: '2021-01-21T22:06',

    /** End date of the tender */
    DATE_END: '2021-01-29T22:06',

    /** Tender title */
    TITLE: 'Test tender title',

    /** Tender description */
    DESCRIPTION: null,

    /** Default currency */
    CURRENCY: this._currencies[0],

    /** Expected amount */
    EXPECTED_VALUE: 100,

    /** Step of the bet */
    STEP_VALUE: 1,

    /** Quantity of goods */
    QUANTITY: 1,

    /** In what units the goods are measured */
    UNIT: this._units[0],

    /** To show the best bet or not */
    IS_SHOW_BEST_BET: true
  };


  /** Default values when creating a new tender */
  readonly _LOGIN_DEFAULT_VALUE: LoginDefaultValue = {
    /** Min/Max password length */
    MIN_PASSWORD_LENGTH: 6,
    MAX_PASSWORD_LENGTH: 100,

    /** Email default value */
    EMAIL: null,

    /** Password default value */
    PASSWORD: null
  };


  readonly _FIREBASE_ERROR_MESSAGE: FirebaseErrorMessage = {
    EMAIL_NOT_FOUND: 'EMAIL_NOT_FOUND',
    INVALID_PASSWORD: 'INVALID_PASSWORD',
    TOO_MANY_ATTEMPTS: 'TOO_MANY_ATTEMPTS'
  };


  readonly _SNACKBAR: SnackBarTxtColor = {
    DEFAULT: 'snack-bar-default',
    SUCCESS: 'snack-bar-success',
    ERROR: 'snack-bar-error',
    WARNING: 'snack-bar-warning'
  };

}
