// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from '../app/types/environment.type';

export const environment: Environment = {
  production: false,
  locales: ['en', 'ua'],
  defaultLocale: 'ua',
  firebase_signup_url: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
  firebase_login_url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
  firebase_DB_url: 'https://simpletender-aa98d-default-rtdb.firebaseio.com/',
  apiKey: 'AIzaSyAXnUsgQQyz2L22QweCctYKqcDNWGTnoJY'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
