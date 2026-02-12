/** Supported locales for the landing. */
export type Locale = "en" | "ru" | "kz";

/** Flattened message keys for type-safe t() - add keys as you add copy. */
export type Messages = {
  common: {
    siteName: string;
    nav: Record<string, string>;
    cta: Record<string, string>;
    footer: Record<string, string>;
  };
  home: Record<string, unknown>;
  howItWorks: Record<string, unknown>;
  about: Record<string, unknown>;
  waitlist: Record<string, unknown>;
  forUniversities: Record<string, unknown>;
  forSchools: Record<string, unknown>;
  clarity: Record<string, unknown>;
};

export const LOCALES: Locale[] = ["en", "ru", "kz"];

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
  kz: "Қазақша",
};

export const DEFAULT_LOCALE: Locale = "en";

export function isValidLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}
