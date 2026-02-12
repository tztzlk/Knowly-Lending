"use client";

import Link from "next/link";
import { useLocale } from "@/components/context/LocaleContext";
import Container from "@/components/layout/Container";
import { localePrefix } from "@/lib/i18n";

export function LandingHero() {
  const { locale, t } = useLocale();
  const base = localePrefix(locale);
  const m = t.home.hero as { headline: string; subhead: string; cta: string };

  return (
    <section
      className="bg-ref-bg py-12 sm:py-16 md:py-24 lg:py-28 overflow-x-hidden"
      aria-labelledby="hero-heading"
    >
      <Container>
        <div className="mx-auto max-w-content-mobile sm:max-w-xl md:max-w-2xl lg:max-w-3xl text-center">
          <h1
            id="hero-heading"
            className="text-responsive-h1 font-bold leading-tight text-ref-heading tracking-tight motion-safe:animate-fade-in"
          >
            {m.headline}
          </h1>
          <p className="mt-4 mx-auto text-responsive-lg leading-[1.5] text-ref-body max-w-[65ch]">
            {m.subhead}
          </p>
          <div className="mt-8">
            <Link
              href={`${base}/waitlist`}
              className="inline-flex items-center justify-center min-h-touch rounded-lg bg-ref-primary px-6 py-3 text-base font-semibold text-white shadow-refCard transition-smooth hover:bg-ref-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ref-primary"
            >
              {m.cta}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
