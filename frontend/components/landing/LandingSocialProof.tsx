"use client";

import { useLocale } from "@/components/context/LocaleContext";
import Container from "@/components/layout/Container";

function highlightQuote(text: string, highlight: string): React.ReactNode {
  if (!highlight || !text.includes(highlight)) return text;
  const i = text.indexOf(highlight);
  return (
    <>
      {text.slice(0, i)}
      <strong className="font-semibold text-ref-heading">{highlight}</strong>
      {text.slice(i + highlight.length)}
    </>
  );
}

export function LandingSocialProof() {
  const { t } = useLocale();
  const m = t.home.socialProof as {
    eyebrow: string;
    title: string;
    quote1?: string;
    quote1Highlight?: string;
    quote2?: string;
    quote2Highlight?: string;
    placeholder: string;
  };

  const hasQuotes = m.quote1 && m.quote2;

  return (
    <section
      className="bg-neutral-muted py-10 sm:py-14 md:py-20 overflow-x-hidden"
      aria-labelledby="social-title"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">
            {m.eyebrow}
          </span>
          <h2
            id="social-title"
            className="mt-3 text-responsive-h2 font-semibold tracking-tight text-ref-heading"
          >
            {m.title}
          </h2>
          {hasQuotes ? (
            <div className="mt-8 space-y-4 text-left sm:space-y-6">
              <blockquote className="rounded-xl border border-ref-border bg-white px-4 py-4 text-responsive-base leading-[1.5] text-ref-body shadow-subtle sm:px-5">
                &ldquo;{highlightQuote(m.quote1!, m.quote1Highlight ?? "")}&rdquo;
              </blockquote>
              <blockquote className="rounded-xl border border-ref-border bg-white px-4 py-4 text-responsive-base leading-[1.5] text-ref-body shadow-subtle sm:px-5">
                &ldquo;{highlightQuote(m.quote2!, m.quote2Highlight ?? "")}&rdquo;
              </blockquote>
            </div>
          ) : (
            <p className="mt-4 text-responsive-base leading-[1.5] text-ref-body">
              {m.placeholder}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
