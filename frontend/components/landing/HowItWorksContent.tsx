"use client";

import Link from "next/link";
import { useLocale } from "@/components/context/LocaleContext";
import Container from "@/components/layout/Container";
import { localePrefix } from "@/lib/i18n";

function IconBullet({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 8 8" aria-hidden>
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function IconAnswer({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
    </svg>
  );
}
function IconReflect({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 4.937-2.23 2.23-4.937-4.937 2.23-2.23 4.937ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}
function IconDiscover({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}
function IconExplore({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  );
}
function IconShield({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  );
}

const STEP_ICONS = [IconAnswer, IconReflect, IconDiscover, IconExplore];

export function HowItWorksContent() {
  const { locale, t } = useLocale();
  const base = localePrefix(locale);
  const h = t.howItWorks as {
    idea: { eyebrow: string; title: string; b1: string; b2: string; b3: string };
    mechanics: { eyebrow: string; title: string; step1Title: string; step1Copy: string; step2Title: string; step2Copy: string; step3Title: string; step3Copy: string; step4Title: string; step4Copy: string };
    example: { eyebrow: string; title: string; b1: string; b2: string; b3: string };
    ethics: { eyebrow: string; title: string; noMagic: string; noPressure: string; noHype: string };
    cta: { title: string; button: string };
  };

  const ideaBullets = [h.idea.b1, h.idea.b2, h.idea.b3];
  const exampleBullets = [h.example.b1, h.example.b2, h.example.b3];
  const steps = [
    { title: h.mechanics.step1Title, copy: h.mechanics.step1Copy },
    { title: h.mechanics.step2Title, copy: h.mechanics.step2Copy },
    { title: h.mechanics.step3Title, copy: h.mechanics.step3Copy },
    { title: h.mechanics.step4Title, copy: h.mechanics.step4Copy },
  ];

  return (
    <div className="min-h-[60vh] py-section md:py-sectionLg overflow-x-hidden">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-responsive-h1 font-bold tracking-tight text-ref-heading">
            {(t.howItWorks as { title: string }).title}
          </h1>
        </div>

        {/* Idea */}
        <section className="mx-auto mt-14 max-w-4xl" aria-labelledby="how-idea-title">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">
            {h.idea.eyebrow}
          </span>
          <h2 id="how-idea-title" className="mt-2 text-xl font-semibold text-ref-heading md:text-2xl">
            {h.idea.title}
          </h2>
          <ul className="mt-4 space-y-2">
            {ideaBullets.map((text, i) => (
              <li key={i} className="flex gap-2 text-ref-body">
                <IconBullet className="mt-1.5 h-2 w-2 shrink-0 text-primary-500" />
                <span className="text-sm leading-relaxed md:text-base">{text}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Mechanics — 4 steps */}
        <section className="mx-auto mt-14 max-w-4xl md:mt-20" aria-labelledby="how-mechanics-title">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">
            {h.mechanics.eyebrow}
          </span>
          <h2 id="how-mechanics-title" className="mt-2 text-xl font-semibold text-ref-heading md:text-2xl">
            {h.mechanics.title}
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <div
                  key={i}
                  className="rounded-xl border border-ref-border bg-white p-5 shadow-subtle transition-smooth hover:shadow-cardHover motion-safe:animate-fade-in"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                    {Icon && <Icon className="h-5 w-5" />}
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-ref-heading">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ref-body">{step.copy}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Example */}
        <section className="mx-auto mt-14 max-w-4xl md:mt-20" aria-labelledby="how-example-title">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">
            {h.example.eyebrow}
          </span>
          <h2 id="how-example-title" className="mt-2 text-xl font-semibold text-ref-heading md:text-2xl">
            {h.example.title}
          </h2>
          <ul className="mt-4 space-y-2">
            {exampleBullets.map((text, i) => (
              <li key={i} className="flex gap-2 text-ref-body">
                <IconBullet className="mt-1.5 h-2 w-2 shrink-0 text-primary-500" />
                <span className="text-sm leading-relaxed md:text-base">{text}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Ethics */}
        <section className="mx-auto mt-14 max-w-4xl md:mt-20" aria-labelledby="how-ethics-title">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">
            {h.ethics.eyebrow}
          </span>
          <h2 id="how-ethics-title" className="mt-2 text-xl font-semibold text-ref-heading md:text-2xl">
            {h.ethics.title}
          </h2>
          <ul className="mt-4 space-y-2">
            <li className="flex gap-2 text-ref-body">
              <IconShield className="mt-1 h-4 w-4 shrink-0 text-primary-500" />
              <span className="text-sm leading-relaxed md:text-base">{h.ethics.noMagic}</span>
            </li>
            <li className="flex gap-2 text-ref-body">
              <IconShield className="mt-1 h-4 w-4 shrink-0 text-primary-500" />
              <span className="text-sm leading-relaxed md:text-base">{h.ethics.noPressure}</span>
            </li>
            <li className="flex gap-2 text-ref-body">
              <IconShield className="mt-1 h-4 w-4 shrink-0 text-primary-500" />
              <span className="text-sm leading-relaxed md:text-base">{h.ethics.noHype}</span>
            </li>
          </ul>
        </section>

        {/* CTA */}
        <div className="mx-auto mt-14 max-w-xl rounded-2xl border border-ref-border bg-neutral-muted p-5 text-center sm:p-6 md:mt-20">
          <p className="text-responsive-base font-medium leading-[1.5] text-ref-heading">{h.cta.title}</p>
          <Link
            href={`${base}/waitlist`}
            className="mt-4 inline-flex min-h-touch items-center justify-center rounded-lg bg-ref-primary px-5 py-3 text-base font-semibold text-white shadow-refCard transition-smooth hover:bg-ref-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ref-primary md:min-h-0 md:py-2.5 md:text-sm"
          >
            {h.cta.button}
          </Link>
        </div>
      </Container>
    </div>
  );
}
