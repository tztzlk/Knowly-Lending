"use client";

import { useLocale } from "@/components/context/LocaleContext";
import Container from "@/components/layout/Container";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export function LandingCredibility() {
  const { t } = useLocale();
  const m = t.home.credibility as {
    eyebrow: string;
    title: string;
    method: string;
    data: string;
    noFake: string;
  };

  const items = [m.method, m.data, m.noFake];

  return (
    <section className="bg-ref-bg py-10 sm:py-14 md:py-20 overflow-x-hidden" aria-labelledby="credibility-title">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">
            {m.eyebrow}
          </span>
          <h2
            id="credibility-title"
            className="mt-3 text-responsive-h2 font-semibold tracking-tight text-slate-900"
          >
            {m.title}
          </h2>
        </div>
        <ul className="mx-auto mt-8 max-w-2xl space-y-4 sm:mt-10">
          {items.map((text, i) => (
            <li key={i} className="flex gap-3 text-left">
              <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
              <span className="text-responsive-base leading-[1.5] text-ref-body">{text}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
