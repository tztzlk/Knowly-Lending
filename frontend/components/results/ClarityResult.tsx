"use client";

import Link from "next/link";
import { useLocale } from "@/components/context/LocaleContext";
import Container from "@/components/layout/Container";
import {
  getMirror,
  getExamPlan,
  getReflectionText,
  getDirectionReasons,
  getNextSteps,
  type ClarityAnswers,
  type MirrorResult,
  type ExamPlanResult,
  type ResultDomainId,
} from "@/lib/clarity";
import { localePrefix } from "@/lib/i18n";

/* Simple inline icons – friendly, no external deps */
function IconMirror() {
  return (
    <svg className="h-6 w-6 shrink-0 text-ref-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}
function IconCompass() {
  return (
    <svg className="h-6 w-6 shrink-0 text-ref-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
    </svg>
  );
}
function IconLightbulb() {
  return (
    <svg className="h-6 w-6 shrink-0 text-ref-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  );
}
function IconRocket() {
  return (
    <svg className="h-6 w-6 shrink-0 text-ref-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg className="h-5 w-5 shrink-0 text-ref-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export type ClarityResultProps = {
  answers: ClarityAnswers;
  /** Optional: pass precomputed mirror/examPlan if already available */
  mirror?: MirrorResult;
  examPlan?: ExamPlanResult;
};

function buildLabels(c: Record<string, unknown>) {
  const choices = (c.choices ?? {}) as Record<string, Record<string, string>>;
  const mirror = (c.mirror ?? {}) as Record<string, unknown>;
  const learningStyleValues = (mirror.learningStyleValues ?? {}) as Record<string, string>;
  const results = (c.results ?? {}) as Record<string, unknown>;
  const reflection = (results.reflection ?? {}) as Record<string, string>;
  const directions = (results.directions ?? {}) as Record<string, { label: string; reason1: string; reason2: string }>;
  const nextStep = (results.nextStep ?? {}) as Record<string, string>;

  const directionReasons: Record<ResultDomainId, { reason1: string; reason2: string }> = {
    people: { reason1: directions.people?.reason1 ?? "", reason2: directions.people?.reason2 ?? "" },
    logic: { reason1: directions.logic?.reason1 ?? "", reason2: directions.logic?.reason2 ?? "" },
    creativity: { reason1: directions.creativity?.reason1 ?? "", reason2: directions.creativity?.reason2 ?? "" },
  };

  return {
    interests: (choices.interests ?? {}) as Record<string, string>,
    learn: (choices.learn ?? {}) as Record<string, string>,
    situations: (choices.situations ?? {}) as Record<string, string>,
    strengths: (choices.strengths ?? {}) as Record<string, string>,
    feedback: (choices.feedback ?? {}) as Record<string, string>,
    drains: (choices.drains ?? {}) as Record<string, string>,
    learningStyleValues,
    reflection,
    directionReasons,
    nextStep,
  };
}

export function ClarityResult({ answers, mirror: mirrorProp, examPlan: examPlanProp }: ClarityResultProps) {
  const { t, locale } = useLocale();
  const base = localePrefix(locale);
  const c = ((t as { clarity?: Record<string, unknown> }).clarity ?? {}) as Record<string, unknown>;

  const mirror = mirrorProp ?? getMirror(answers);
  const examPlan = examPlanProp ?? getExamPlan(answers);
  const labels = buildLabels(c);

  const reflection = getReflectionText({ answers, mirror, examPlan, labels });
  const directionReasons = getDirectionReasons({ answers, mirror, examPlan, labels });
  const nextSteps = getNextSteps({ answers, mirror, examPlan, labels });

  const header = (c.results as { header?: { title?: string; subtitle?: string } })?.header ?? {};
  const resultsDirections = ((c.results as { directions?: Record<string, { label: string }> })?.directions) ?? {};
  const trust = (c.results as { trust?: { title?: string; bullets?: string[]; cta?: string } })?.trust ?? {};
  const nextStepTitle = ((c.results as { nextStep?: { title?: string } })?.nextStep)?.title ?? "What you can do right now";

  const domainLabels: Record<ResultDomainId, string> = {
    people: resultsDirections.people?.label ?? "Working with people and communication",
    logic: resultsDirections.logic?.label ?? "Logic, systems and technology",
    creativity: resultsDirections.creativity?.label ?? "Creativity and meaning",
  };

  const trustCta = (
    <Link
      href={`${base}/waitlist`}
      className="inline-flex min-h-touch items-center justify-center rounded-lg bg-ref-primary px-5 py-3 text-base font-semibold text-white transition-smooth hover:bg-ref-primary/90 md:min-h-0 md:py-2.5 md:text-sm"
    >
      {trust.cta ?? "Get early access"}
    </Link>
  );

  return (
    <div className="min-h-[60vh] py-section md:py-sectionLg overflow-x-hidden pb-24 sm:pb-0">
      <Container className="max-w-content-mobile sm:max-w-xl md:max-w-2xl">
        {/* A. Header Block */}
        <header className="text-center">
          <h1 className="text-responsive-h1 font-bold tracking-tight text-ref-heading">
            {header.title ?? "Your First Step to Clarity"}
          </h1>
          <p className="mt-3 mx-auto max-w-[38ch] text-responsive-base leading-[1.5] text-ref-body">
            {header.subtitle ??
              "This is not a final verdict. It's a mirror of your interests and ways of thinking."}
          </p>
        </header>

        {/* B. Reflection Block — CORE */}
        <section className="mt-6 sm:mt-8" aria-labelledby="reflection-heading">
          <div className="w-full rounded-card border border-ref-border bg-white p-4 shadow-subtle sm:p-5">
            <h2 id="reflection-heading" className="flex items-center gap-2 text-responsive-h3 font-semibold text-ref-heading">
              <IconMirror />
              <span>{locale === "ru" ? "Рефлексия" : locale === "kz" ? "Рефлексия" : "Reflection"}</span>
            </h2>
            <div className="mt-4 space-y-3 text-responsive-base text-ref-body leading-[1.5]">
              <p className="line-clamp-3">{reflection.enjoy}</p>
              <p className="line-clamp-3">{reflection.think}</p>
              <p className="line-clamp-3">{reflection.learn}</p>
            </div>
          </div>
        </section>

        {/* C. Directions — stack mobile, 2 cols tablet, 3 cols desktop */}
        <section className="mt-6" aria-labelledby="directions-heading">
          <h2 id="directions-heading" className="mb-4 flex items-center gap-2 text-responsive-h3 font-semibold text-ref-heading">
            <IconCompass />
            <span>{locale === "ru" ? "Направления" : locale === "kz" ? "Бағыттар" : "Directions"}</span>
          </h2>
          <div className="grid w-full gap-3 md:grid-cols-2 lg:grid-cols-3">
            {directionReasons.map((d) => (
              <div
                key={d.id}
                className="w-full rounded-card border border-ref-border bg-white p-4 shadow-subtle"
              >
                <h3 className="font-medium text-ref-heading">
                  {domainLabels[d.id]}
                </h3>
                <p className="mt-2 line-clamp-2 text-responsive-base text-ref-body">{d.reason1}</p>
                <p className="mt-1 line-clamp-2 text-responsive-base text-ref-body">{d.reason2}</p>
              </div>
            ))}
          </div>
        </section>

        {/* D. Practical Next Step */}
        <section className="mt-6" aria-labelledby="next-step-heading">
          <div className="w-full rounded-card border border-ref-border bg-white p-4 shadow-subtle sm:p-5">
            <h2 id="next-step-heading" className="flex items-center gap-2 text-responsive-h3 font-semibold text-ref-heading">
              <IconLightbulb />
              <span>{nextStepTitle}</span>
            </h2>
            <ul className="mt-4 space-y-2">
              {nextSteps.map((item, i) => (
                <li key={i} className="flex gap-2 text-responsive-base text-ref-body leading-[1.5]">
                  <span className="mt-0.5 shrink-0"><IconCheck /></span>
                  <span className="line-clamp-2">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* E. Trust Transition to Platform — CTA always visible */}
        <section className="mt-6" aria-labelledby="trust-heading">
          <div className="w-full rounded-card border border-primary-200 bg-primary-50 p-4 shadow-subtle sm:p-5">
            <h2 id="trust-heading" className="flex items-center gap-2 text-responsive-h3 font-semibold text-ref-heading">
              <IconRocket />
              <span>{trust.title ?? "The full platform goes deeper"}</span>
            </h2>
            <ul className="mt-4 space-y-2">
              {(trust.bullets ?? []).map((bullet, i) => (
                <li key={i} className="flex gap-2 text-responsive-base text-ref-body leading-[1.5]">
                  <span className="mt-0.5 shrink-0"><IconCheck /></span>
                  <span className="line-clamp-2">{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5">
              {trustCta}
            </div>
          </div>
        </section>

        {/* Sticky CTA on mobile — always visible at bottom */}
        <div className="fixed bottom-0 left-0 right-0 z-20 flex justify-center border-t border-ref-border bg-white/95 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] backdrop-blur sm:hidden">
          {trustCta}
        </div>
      </Container>
    </div>
  );
}
