export enum Language {
  en = 'en',
  ru = 'ru',
}

export type Locale = (typeof LOCALES)[number];

export const COOKIE_NAME = 'NEXT_LOCALE';

export const LOCALES: readonly Language[] = Object.values(Language);

export const DEFAULT_LOCALE: Locale = Language.en;
