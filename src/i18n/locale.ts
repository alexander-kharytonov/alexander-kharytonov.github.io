'use server';

import { cookies } from 'next/headers';
import { COOKIE_NAME, DEFAULT_LOCALE, Locale } from '@/constants/locale';

export async function getUserLocale() {
  return (await cookies()).get(COOKIE_NAME)?.value || DEFAULT_LOCALE;
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}
