"use client";

import Link from "next/link";
import { useLocale } from "@/components/context/LocaleContext";
import Container from "@/components/layout/Container";
import Logo from "@/components/shared/Logo";
import { localePrefix } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const FOOTER_LINKS = [
  { href: "/how-it-works", key: "howItWorks" as const },
  { href: "/about", key: "about" as const },
  { href: "/for-schools", key: "forSchools" as const },
  { href: "/for-universities", key: "forUniversities" as const },
  { href: "/waitlist", key: "waitlist" as const },
] as const;

export default function LandingFooter() {
  const { locale, t } = useLocale();
  const base = localePrefix(locale);

  return (
    <footer className="border-t border-ref-border bg-ref-heading text-white overflow-x-hidden">
      <Container className="flex flex-col gap-10 py-10 sm:py-14 md:py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Logo variant="light" localePrefix={base || undefined} />
          <nav
            className="flex flex-wrap gap-x-4 gap-y-2 text-responsive-base text-slate-400 sm:gap-x-6"
            aria-label="Footer navigation"
          >
            {FOOTER_LINKS.map(({ href, key }) => (
              <Link
                key={key}
                href={`${base}${href}`}
                className="min-h-touch inline-flex items-center rounded-md px-1 py-2 transition-smooth hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:min-h-0 md:py-0.5"
              >
                {t.common.nav[key]}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-2 border-t border-slate-700/50 pt-6 text-responsive-base text-slate-500 md:flex-row md:items-center md:justify-between md:pt-8">
          <span className="leading-relaxed">© {new Date().getFullYear()} {t.common.siteName}. {t.common.footer.rights}</span>
          <span className="leading-relaxed">{t.common.footer.tagline}</span>
        </div>
      </Container>
    </footer>
  );
}
