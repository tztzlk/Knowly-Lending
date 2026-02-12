import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { LocaleProvider } from "@/components/context/LocaleContext";
import LandingHeader from "@/components/layout/LandingHeader";
import LandingFooter from "@/components/layout/LandingFooter";
import { SetHtmlLang } from "@/components/context/SetHtmlLang";
import { isValidLocale } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }, { locale: "kz" }];
}

type Props = { children: ReactNode; params: Promise<{ locale: string }> };

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: raw } = await params;
  const locale = isValidLocale(raw) ? raw : ("en" as Locale);
  if (!isValidLocale(raw)) redirect("/en");

  return (
    <LocaleProvider initialLocale={locale}>
      <SetHtmlLang locale={locale} />
      <LandingHeader />
      <main id="main">{children}</main>
      <LandingFooter />
    </LocaleProvider>
  );
}
