import { ThemePalette } from '@angular/material/core';

import { environment } from '../environments/environment';
import { TenderLocale } from './types/tender-locale.type';
import { NewTenderDefaultValue } from './types/new-tender-default-value.type';
import { TenderCurrency } from './types/tender-currency.type';
import { TenderUnit } from './types/tender-unit.type';
import { LoginDefaultValue } from './types/login-default-value.type';
import { FirebaseErrorMessage } from './types/firebase-error-message.type';
import { FirebaseConst } from './types/firebase-const.type';
import { SnackBarTxtColor } from './types/snack-bar-txt-color.type';
import { MaterialIcons } from './types/material-icons.type';
import { RouterUrl } from './types/router-url.type';
import { BetDefaultValue } from './types/bet-default-value.type';
import { TenderStatusesAll } from './types/tender-status.type';


export class TenderConfig {

  /** The name of the tender table in the database */
  readonly _TENDERS_DB_TABLE_NAME: string = 'tenders';

  /** URLs */
  readonly _FIREBASE_LOGIN_URL: string = environment.firebase_login_url + environment.firebaseConfig.apiKey;
  readonly _FIREBASE_REFRESH_TOKEN_URL: string = environment.firebase_refresh_url + environment.firebaseConfig.apiKey;
  readonly _FIREBASE_SIGNUP_URL: string = environment.firebase_signup_url + environment.firebaseConfig.apiKey;
  readonly _FIREBASE_GET_USER_DATA_URL: string = environment.firebase_lookup_url + environment.firebaseConfig.apiKey;
  readonly _FIREBASE_TENDERS_URL: string = environment.firebase_DB_url + this._TENDERS_DB_TABLE_NAME;

  /** Possible color palette values: 'primary' | 'accent' | 'warn' */
  readonly _currentThemePalette: ThemePalette = 'primary';

  /** Maximum string length for titles, comments, etc */
  readonly _MAX_STR_LENGTH: number = 30;

  readonly _TIME_FORMAT_FULL: string = 'dd.MM.YYYY HH:mm:ss';
  readonly _TIME_FORMAT_SMALL: string = 'dd.MM.YYYY HH:mm';

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

  readonly _TENDER_STATUSES_ALL: TenderStatusesAll = {
    ACTIVE: 'active',
    CLOSED: 'closed',
    PLANNED: 'planned',
  };

  /** Default values when creating a new tender */
  readonly _NEW_TENDER_DEFAULT_VALUE: NewTenderDefaultValue = {
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
    DATE_START: '2021-02-12T22:06',

    /** End date of the tender */
    DATE_END: '2021-03-29T22:06',

    /** Tender title */
    TITLE: 'Test tender title',

    /** Tender description */
    DESCRIPTION: 'Description for new test tender',

    /** Default currency */
    CURRENCY: this._currencies[0],

    /** Step of the bet */
    STEP_VALUE: 1,

    /** Quantity of goods */
    QUANTITY: 1,

    /** In what units the goods are measured */
    UNIT: this._units[0],

    /** To show the best bet or not */
    IS_SHOW_BEST_BET: true,
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


  /** Default values when creating a new tender */
  readonly _BET_DEFAULT_VALUE: BetDefaultValue = {
    /** Min/Max comment length */
    MIN_COMMENT_LENGTH: 5,
    MAX_COMMENT_LENGTH: 200,

    /** The bet value maximum limit */
    MAX_BET_VALUE: 1000000,

    /** A bet default value */
    VALUE: 0,

    /** Comment for a bet default value */
    COMMENT: null
  };


  readonly _FIREBASE_ERROR_MESSAGE: FirebaseErrorMessage = {
    EMAIL_NOT_FOUND: 'EMAIL_NOT_FOUND',
    INVALID_PASSWORD: 'INVALID_PASSWORD',
    TOO_MANY_ATTEMPTS: 'TOO_MANY_ATTEMPTS',
    USER_DISABLED: 'USER_DISABLED',
    EMAIL_EXISTS: 'EMAIL_EXISTS',
    OPERATION_NOT_ALLOWED: 'OPERATION_NOT_ALLOWED',
    INVALID_REFRESH_TOKEN: 'INVALID_REFRESH_TOKEN',
    INVALID_ID_TOKEN: 'INVALID_ID_TOKEN'
  };

  readonly _FIREBASE: FirebaseConst = {
    LOCAL_STORAGE_TOKEN_NAME: 'firebase-token',
    LOCAL_STORAGE_REFRESH_TOKEN_NAME: 'firebase-refresh-token',
    LOCAL_STORAGE_EXPIRES_TOKEN_NAME: 'firebase-token-expires',
    LOCAL_STORAGE_USER_EMAIL_NAME: 'firebase-user-email',
    LOCAL_STORAGE_USER_DISPLAY_NAME: 'firebase-user-display-name',
    REFRESH_TOKEN_GRANT_TYPE_NAME: 'refresh_token'
  };


  readonly _SNACKBAR: SnackBarTxtColor = {
    DEFAULT: 'snack-bar-default',
    SUCCESS: 'snack-bar-success',
    ERROR: 'snack-bar-error',
    WARNING: 'snack-bar-warning'
  };

  readonly _MATERIAL_ICON: MaterialIcons = {
    ADD: 'add',
    SIGNUP: 'face',
    LOGIN: 'login',
    LOGOUT: 'logout',
    LIST: 'format_list_numbered'
  };

  readonly _ROUTER_URL: RouterUrl = {
    LIST: '/' + environment.router_list_url,
    CREATE: '/' + environment.router_create_url,
    VIEW: '/' + environment.router_view_url,
    LOGIN: '/' + environment.router_login_url,
    SIGNUP: '/' + environment.router_signup_url
  };

}
