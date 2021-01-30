import { Locale } from './locale.type';

export interface Environment {
  production: boolean;
  locales: Locale[];
  defaultLocale: Locale;
  firebase_login_url: string;
  apiKey: string;
}
