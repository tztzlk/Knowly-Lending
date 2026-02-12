"use client";

import Link from "next/link";
import { useLocale } from "@/components/context/LocaleContext";
import Container from "@/components/layout/Container";
import { localePrefix } from "@/lib/i18n";

export function LandingParentsBlock() {
  const { locale, t } = useLocale();
  const base = localePrefix(locale);
  const m = t.home.parents as {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
  };

  return (
    <section className="bg-ref-bg py-10 sm:py-14 md:py-20 overflow-x-hidden" aria-labelledby="parents-title">
      <Container>
        <div className="mx-auto max-w-2xl rounded-2xl border border-ref-border bg-white p-5 shadow-subtle sm:p-8 md:p-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">
            {m.eyebrow}
          </span>
          <h2 id="parents-title" className="mt-2 text-responsive-h2 font-semibold tracking-tight text-ref-heading">
            {m.title}
          </h2>
          <p className="mt-4 text-responsive-base leading-[1.5] text-ref-body">{m.body}</p>
          <Link
            href={`${base}/how-it-works`}
            className="mt-6 inline-flex min-h-touch items-center justify-center rounded-lg border-2 border-ref-primary bg-transparent px-5 py-3 text-base font-semibold text-ref-primary transition-smooth hover:bg-ref-primary/5 md:min-h-0 md:py-2.5 md:text-sm"
          >
            {m.cta}
          </Link>
        </div>
      </Container>
    </section>
  );
}
