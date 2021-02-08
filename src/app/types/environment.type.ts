import { Locale } from './locale.type';

export interface Environment {
  production: boolean;
  locales: Locale[];
  defaultLocale: Locale;
  firebase_signup_url: string;
  firebase_login_url: string;
  firebase_DB_url: string;
  apiKey: string;
}
