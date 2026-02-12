"use client";

import { useEffect } from "react";
import type { Locale } from "@/lib/i18n";

const LANG_MAP: Record<Locale, string> = {
  en: "en",
  ru: "ru",
  kz: "kk",
};

export function SetHtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = LANG_MAP[locale];
  }, [locale]);
  return null;
}
