import { Environment } from '../app/types/environment.type';

export const environment: Environment = {
  production: true,
  locales: ['en', 'ua'],
  defaultLocale: 'ua',
  firebaseConfig: {
    apiKey: 'AIzaSyAXnUsgQQyz2L22QweCctYKqcDNWGTnoJY',
    authDomain: 'simpletender-aa98d.firebaseapp.com',
    databaseURL: 'https://simpletender-aa98d-default-rtdb.firebaseio.com',
    projectId: 'simpletender-aa98d',
    storageBucket: 'simpletender-aa98d.appspot.com',
    messagingSenderId: '260420599916',
    appId: '1:260420599916:web:bf99bd27d52549fc36d849'
  },
  firebase_signup_url: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
  firebase_lookup_url: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=',
  firebase_login_url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
  firebase_refresh_url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=',
  firebase_DB_url: 'https://simpletender-aa98d-default-rtdb.firebaseio.com/',
  router_list_url: 'list',
  router_create_url: 'create',
  router_view_url: 'view',
  router_login_url: 'login',
  router_signup_url: 'signup'
};
