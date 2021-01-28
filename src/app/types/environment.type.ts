import { Locale } from './locale.type';

export interface Environment {
  production: boolean;
  locales: Locale[];
  defaultLocale: Locale;
  apiKey: string;
}
