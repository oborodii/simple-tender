import { Environment } from '../app/types/environment.type';

export const environment: Environment = {
  production: true,
  locales: ['en', 'ua'],
  defaultLocale: 'ua',
  firebase_signup_url: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
  firebase_login_url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
  firebase_DB_url: 'https://simpletender-aa98d-default-rtdb.firebaseio.com/',
  apiKey: 'AIzaSyAXnUsgQQyz2L22QweCctYKqcDNWGTnoJY'
};
