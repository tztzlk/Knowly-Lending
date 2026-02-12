"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useLocale } from "@/components/context/LocaleContext";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import Container from "@/components/layout/Container";
import Logo from "@/components/shared/Logo";
import { localePrefix } from "@/lib/i18n";

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

/** Desktop order: Test → How it works → About → Home → Blog */
const NAV_LINKS = [
  { href: "/clarity", key: "clarity" as const },
  { href: "/how-it-works", key: "howItWorks" as const },
  { href: "/about", key: "about" as const },
  { href: "/", key: "home" as const },
  { href: "/blog", key: "blog" as const },
] as const;

const ctaPrimaryClass =
  "inline-flex items-center justify-center min-h-touch rounded-lg bg-ref-primary px-4 py-3 text-base font-semibold text-white shadow-refCard transition-smooth hover:bg-ref-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ref-primary md:min-h-0 md:py-2 md:text-sm";
const ctaSecondaryClass =
  "inline-flex items-center justify-center min-h-touch rounded-lg border border-ref-border bg-white px-4 py-3 text-base font-medium text-ref-heading transition-smooth hover:bg-neutral-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ref-primary md:min-h-0 md:py-2 md:text-sm";

export default function LandingHeader() {
  const { locale, t } = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const base = localePrefix(locale);
  const isForUniversities = pathname.includes("/for-universities");

  return (
    <header className="sticky top-0 z-50 border-b border-ref-border bg-ref-bg/95 backdrop-blur-md transition-shadow">
      <Container className="flex items-center justify-between py-3 md:py-4">
        <Logo variant="dark" localePrefix={base || undefined} />

        <nav
          className="hidden items-center gap-1 text-sm font-medium text-slate-600 md:flex"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map(({ href, key }) => {
            const to = href === "/" ? base : `${base}${href}`;
            const isActive = pathname === to || (href !== "/" && pathname.startsWith(to));
            return (
              <Link
                key={key}
                href={to}
                className={`rounded-lg px-3 py-2 transition-smooth hover:bg-ref-border/50 hover:text-ref-heading ${
                  isActive ? "text-ref-primary font-medium" : "text-ref-body"
                }`}
              >
                {t.common.nav[key]}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <LanguageSwitcher className="hidden md:block" />
          <Link
            href={`${base}/waitlist`}
            className={`${ctaPrimaryClass} min-w-[100px] md:min-w-0`}
          >
            {t.common.cta.preRegister}
          </Link>
          <Link
            href={isForUniversities ? `${base}/for-universities` : `${base}/for-schools`}
            className={`${ctaSecondaryClass} hidden md:inline-flex`}
          >
            {isForUniversities ? t.common.nav.forUniversities : t.common.nav.forSchools}
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex md:hidden items-center justify-center min-h-touch min-w-[3rem] rounded-lg p-2 text-ref-body hover:bg-ref-border/50 transition-smooth"
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div className="border-t border-ref-border bg-ref-bg md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map(({ href, key }) => {
              const to = href === "/" ? base : `${base}${href}`;
              return (
                <Link
                  key={key}
                  href={to}
                  onClick={() => setMobileOpen(false)}
                  className="block min-h-touch rounded-lg px-3 py-3 text-base font-medium text-ref-heading hover:bg-ref-border/50 transition-smooth"
                >
                  {t.common.nav[key]}
                </Link>
              );
            })}
            <Link
              href={`${base}/for-schools`}
              onClick={() => setMobileOpen(false)}
              className="block min-h-touch rounded-lg px-3 py-3 text-base font-medium text-ref-heading hover:bg-ref-border/50 transition-smooth"
            >
              {t.common.nav.forSchools}
            </Link>
            <Link
              href={`${base}/for-universities`}
              onClick={() => setMobileOpen(false)}
              className="block min-h-touch rounded-lg px-3 py-3 text-base font-medium text-ref-heading hover:bg-ref-border/50 transition-smooth"
            >
              {t.common.nav.forUniversities}
            </Link>
            <div className="mt-3 border-t border-ref-border pt-3">
              <LanguageSwitcher />
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
