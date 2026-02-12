"use client";

import Link from "next/link";
import { useLocale } from "@/components/context/LocaleContext";
import Container from "@/components/layout/Container";
import { localePrefix } from "@/lib/i18n";

function IconCheck({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}
function IconStudent({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
    </svg>
  );
}
function IconHeart({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  );
}
function IconUsers({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
  );
}

const AUDIENCE_ICONS = [IconStudent, IconHeart, IconUsers];

export function ForSchoolsContent() {
  const { locale, t } = useLocale();
  const base = localePrefix(locale);
  const f = t.forSchools as {
    hero: { title: string; subhead: string };
    forStudents?: { title: string; b1: string; b2: string; b3: string };
    forParents?: { title: string; b1: string; b2: string; b3: string };
    forCounselors?: { title: string; b1: string; b2: string; b3: string };
    value: { eyebrow: string; title: string; bullets: string[] };
    cta: { title: string; subhead: string; button: string };
  };

  const audiences = [
    f.forStudents ? { title: f.forStudents.title, bullets: [f.forStudents.b1, f.forStudents.b2, f.forStudents.b3] } : null,
    f.forParents ? { title: f.forParents.title, bullets: [f.forParents.b1, f.forParents.b2, f.forParents.b3] } : null,
    f.forCounselors ? { title: f.forCounselors.title, bullets: [f.forCounselors.b1, f.forCounselors.b2, f.forCounselors.b3] } : null,
  ].filter(Boolean) as { title: string; bullets: string[] }[];

  const valueBullets = f.value?.bullets ?? [];

  return (
    <div className="min-h-[60vh] py-section md:py-sectionLg overflow-x-hidden">
      <Container>
        <section className="mx-auto max-w-2xl text-center" aria-labelledby="for-schools-hero-title">
          <h1 id="for-schools-hero-title" className="text-responsive-h1 font-bold tracking-tight text-ref-heading">
            {f.hero.title}
          </h1>
          <p className="mt-4 text-responsive-base leading-[1.5] text-ref-body">{f.hero.subhead}</p>
        </section>

        {audiences.length > 0 && (
          <section className="mx-auto mt-14 max-w-4xl md:mt-20" aria-label="For students, parents, counselors">
            <div className="grid gap-6 md:grid-cols-3">
              {audiences.map((aud, i) => {
                const Icon = AUDIENCE_ICONS[i];
                return (
                  <div
                    key={i}
                    className="rounded-xl border border-ref-border bg-white p-6 shadow-subtle transition-smooth hover:shadow-cardHover motion-safe:animate-fade-in"
                  >
                    <div className="flex items-center gap-2">
                      {Icon && <Icon className="h-5 w-5 text-ref-primary" aria-hidden />}
                      <h2 className="text-lg font-semibold text-ref-heading">{aud.title}</h2>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {aud.bullets.map((b, j) => (
                        <li key={j} className="flex gap-2 text-sm text-ref-body">
                          <IconCheck className="mt-1.5 h-4 w-4 shrink-0 text-primary-500" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {valueBullets.length > 0 && (
          <section className="mx-auto mt-14 max-w-4xl md:mt-20" aria-labelledby="for-schools-value-title">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">
              {f.value.eyebrow}
            </span>
            <h2 id="for-schools-value-title" className="mt-2 text-xl font-semibold text-ref-heading">
              {f.value.title}
            </h2>
            <ul className="mt-4 space-y-2">
              {valueBullets.map((bullet, i) => (
                <li key={i} className="flex gap-2 text-ref-body">
                  <IconCheck className="mt-1.5 h-4 w-4 shrink-0 text-primary-500" />
                  <span className="text-sm leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mx-auto mt-14 max-w-xl rounded-2xl border border-ref-border bg-ref-primary px-6 py-12 text-center shadow-subtle transition-smooth md:mt-20">
          <p className="font-semibold text-white">{f.cta.title}</p>
          <p className="mt-2 text-sm text-white/90">{f.cta.subhead}</p>
          <Link
            href={`${base}/waitlist`}
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-ref-primary shadow-refCard transition-smooth hover:bg-white/95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {f.cta.button}
          </Link>
        </div>
      </Container>
    </div>
  );
}
