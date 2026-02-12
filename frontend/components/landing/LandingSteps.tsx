"use client";

import { useLocale } from "@/components/context/LocaleContext";
import Container from "@/components/layout/Container";

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

const STEP_ICONS = [IconReflect, IconDiscover, IconExplore];

export function LandingSteps() {
  const { t } = useLocale();
  const m = t.home.steps as {
    eyebrow: string;
    title: string;
    step1Title: string;
    step1Copy: string;
    step2Title: string;
    step2Copy: string;
    step3Title: string;
    step3Copy: string;
  };

  const steps = [
    { title: m.step1Title, copy: m.step1Copy },
    { title: m.step2Title, copy: m.step2Copy },
    { title: m.step3Title, copy: m.step3Copy },
  ];

  return (
    <section
      className="bg-ref-bg py-10 sm:py-14 md:py-20 overflow-x-hidden"
      aria-labelledby="steps-title"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">
            {m.eyebrow}
          </span>
          <h2
            id="steps-title"
            className="mt-3 text-responsive-h2 font-semibold tracking-tight text-ref-heading"
          >
            {m.title}
          </h2>
        </div>
        <div className="mx-auto mt-8 grid w-full gap-6 sm:mt-12 md:grid-cols-3 md:gap-6">
          {steps.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <div
                key={i}
                className="relative rounded-xl border border-ref-border bg-white p-5 shadow-subtle transition-smooth hover:shadow-cardHover motion-safe:animate-fade-in sm:p-6"
              >
                <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary-100 text-ref-primary"
                  aria-hidden
                >
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-responsive-h3 font-semibold text-ref-heading">
                  {step.title}
                </h3>
                <p className="mt-2 text-responsive-base leading-[1.5] text-ref-body">
                  {step.copy}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
