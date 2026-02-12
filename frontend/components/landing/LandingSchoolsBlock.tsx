"use client";

import Link from "next/link";
import { useLocale } from "@/components/context/LocaleContext";
import Container from "@/components/layout/Container";
import { localePrefix } from "@/lib/i18n";

export function LandingSchoolsBlock() {
  const { locale, t } = useLocale();
  const base = localePrefix(locale);
  const m = t.home.schools as {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
  };

  return (
    <section className="bg-neutral-muted py-14 md:py-20" aria-labelledby="schools-title">
      <Container>
        <div className="mx-auto max-w-2xl rounded-2xl border border-ref-border bg-white p-8 shadow-subtle md:p-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">
            {m.eyebrow}
          </span>
          <h2 id="schools-title" className="mt-2 text-2xl font-semibold tracking-tight text-ref-heading md:text-3xl">
            {m.title}
          </h2>
          <p className="mt-4 leading-relaxed text-ref-body">{m.body}</p>
          <Link
            href={`${base}/for-schools`}
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-ref-primary px-5 py-2.5 text-sm font-semibold text-white transition-smooth hover:bg-ref-primary/90"
          >
            {m.cta}
          </Link>
        </div>
      </Container>
    </section>
  );
}
