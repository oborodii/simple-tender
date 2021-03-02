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
  firebaseUrl: {
    signup: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
    lookup: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=',
    login: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
    refresh: 'https://securetoken.googleapis.com/v1/token?key=',
    DB: 'https://simpletender-aa98d-default-rtdb.firebaseio.com/',
  },
  routerPath: {
    list: 'list',
    create: 'create',
    view: 'view',
    login: 'login',
    signup: 'signup'
  }
};
