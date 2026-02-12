"use client";

import Link from "next/link";
import { useLocale } from "@/components/context/LocaleContext";
import Container from "@/components/layout/Container";
import { localePrefix } from "@/lib/i18n";

export function LandingCTA() {
  const { locale, t } = useLocale();
  const base = localePrefix(locale);
  const m = t.home.cta as { title: string; subhead: string; button: string };

  return (
    <section className="bg-ref-bg py-12 sm:py-16 md:py-20 overflow-x-hidden" aria-labelledby="cta-title">
      <Container>
        <div className="rounded-2xl bg-ref-primary px-5 py-10 text-center sm:px-6 sm:py-12 md:px-12 md:py-16">
          <h2
            id="cta-title"
            className="font-display text-responsive-h2 font-semibold tracking-tight text-white"
          >
            {m.title}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-responsive-base leading-[1.5] text-white/90">
            {m.subhead}
          </p>
          <div className="mt-8">
            <Link
              href={`${base}/waitlist`}
              className="inline-flex items-center justify-center min-h-touch rounded-lg bg-white px-6 py-3 text-base font-semibold text-ref-primary shadow-refCard transition-smooth hover:bg-white/95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {m.button}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
