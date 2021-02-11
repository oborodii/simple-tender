import { Environment } from '../app/types/environment.type';

export const environment: Environment = {
  production: true,
  locales: ['en', 'ua'],
  defaultLocale: 'ua',
  apiKey: 'AIzaSyAXnUsgQQyz2L22QweCctYKqcDNWGTnoJY',
  firebase_signup_url: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
  firebase_lookup_url: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=',
  firebase_login_url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
  firebase_DB_url: 'https://simpletender-aa98d-default-rtdb.firebaseio.com/',
  router_list_url: 'list',
  router_create_url: 'create',
  router_view_url: 'view',
  router_login_url: 'login',
  router_signup_url: 'signup'
};
