import { Locale } from './locale.type';
import { FirebaseConfig } from './firebase-config.type';
import { FirebaseUrl } from './firebase-url.type';
import { RouterPath } from './router-path.type';

export interface Environment {
  production: boolean;
  locales: Locale[];
  defaultLocale: Locale;
  firebaseConfig: FirebaseConfig;
  firebaseUrl: FirebaseUrl;
  routerPath: RouterPath;
}
