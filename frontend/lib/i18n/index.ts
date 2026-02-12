import type { Locale, Messages } from "./types";
import { isValidLocale, DEFAULT_LOCALE } from "./types";
import { en } from "./messages/en";
import { ru } from "./messages/ru";
import { kz } from "./messages/kz";

export type { Locale, Messages };
export { LOCALES, LOCALE_NAMES, DEFAULT_LOCALE, isValidLocale } from "./types";

const messages: Record<Locale, Messages> = { en, ru, kz };

export function getMessages(locale: string): Messages {
  const l = isValidLocale(locale) ? locale : DEFAULT_LOCALE;
  return messages[l];
}

export function getLocaleFromPath(pathname: string): Locale | null {
  const segment = pathname.split("/")[1];
  return segment && isValidLocale(segment) ? segment : null;
}

/** Base path for locale-prefixed links: "/en", "/ru", "/kz" so all locales use direct URLs (no detour). */
export function localePrefix(locale: Locale): string {
  return `/${locale}`;
}
