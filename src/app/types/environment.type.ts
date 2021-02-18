import { Locale } from './locale.type';
import { FirebaseConfig } from './firebase-config.type';

export interface Environment {
  production: boolean;
  locales: Locale[];
  defaultLocale: Locale;
  firebaseConfig: FirebaseConfig;
  firebase_signup_url: string;
  firebase_lookup_url: string;
  firebase_login_url: string;
  firebase_DB_url: string;
  router_list_url: string;
  router_create_url: string;
  router_view_url: string;
  router_login_url: string;
  router_signup_url: string;
}
