"use client";

import Link from "next/link";
import { useLocale } from "@/components/context/LocaleContext";
import Container from "@/components/layout/Container";
import { localePrefix } from "@/lib/i18n";

export function ForUniversitiesContent() {
  const { locale, t } = useLocale();
  const base = localePrefix(locale);
  const f = t.forUniversities as {
    hero: { title: string; subhead: string };
    value: { eyebrow: string; title: string; body: string };
    benefits: {
      title: string;
      b1Title: string;
      b1Copy: string;
      b2Title: string;
      b2Copy: string;
      b3Title: string;
      b3Copy: string;
    };
    cta: { title: string; subhead: string; button: string };
  };

  return (
    <div className="min-h-[60vh] py-section md:py-sectionLg overflow-x-hidden">
      <Container>
        <section className="mx-auto max-w-2xl text-center" aria-labelledby="hero-title">
          <h1 id="hero-title" className="text-responsive-h1 font-bold tracking-tight text-ref-heading">
            {f.hero.title}
          </h1>
          <p className="mt-4 text-responsive-base leading-[1.5] text-ref-body">{f.hero.subhead}</p>
        </section>

        <section className="mx-auto mt-14 max-w-2xl" aria-labelledby="value-title">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">
            {f.value.eyebrow}
          </span>
          <h2 id="value-title" className="mt-2 text-xl font-semibold text-slate-900">
            {f.value.title}
          </h2>
          <p className="mt-3 leading-relaxed text-ref-body">{f.value.body}</p>
        </section>

        <section className="mt-14" aria-labelledby="benefits-title">
          <h2 id="benefits-title" className="text-xl font-semibold text-slate-900">
            {f.benefits.title}
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-ref-border bg-white p-6 shadow-subtle">
              <h3 className="font-semibold text-ref-heading">{f.benefits.b1Title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ref-body">{f.benefits.b1Copy}</p>
            </div>
            <div className="rounded-xl border border-ref-border bg-white p-6 shadow-subtle">
              <h3 className="font-semibold text-ref-heading">{f.benefits.b2Title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ref-body">{f.benefits.b2Copy}</p>
            </div>
            <div className="rounded-xl border border-ref-border bg-white p-6 shadow-subtle">
              <h3 className="font-semibold text-ref-heading">{f.benefits.b3Title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ref-body">{f.benefits.b3Copy}</p>
            </div>
          </div>
        </section>

        <div className="mx-auto mt-14 max-w-xl rounded-2xl bg-ref-primary px-5 py-10 text-center sm:px-6 sm:py-12">
          <p className="text-responsive-base font-semibold leading-[1.5] text-white">{f.cta.title}</p>
          <p className="mt-2 text-responsive-base text-white/90">{f.cta.subhead}</p>
          <Link
            href={`${base}/waitlist`}
            className="mt-6 inline-flex min-h-touch items-center justify-center rounded-lg bg-white px-5 py-3 text-base font-semibold text-ref-primary hover:bg-white/95 md:min-h-0 md:py-2.5 md:text-sm"
          >
            {f.cta.button}
          </Link>
        </div>
      </Container>
    </div>
  );
}
