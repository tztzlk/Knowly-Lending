"use client";

import { useLocale } from "@/components/context/LocaleContext";
import Container from "@/components/layout/Container";

function CompassIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m9.813 15.904 4.937-2.23 2.23-4.937-4.937 2.23-2.23 4.937ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  );
}

function SparkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904 4.937-2.23 2.23-4.937-4.937 2.23-2.23 4.937ZM12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z"
      />
    </svg>
  );
}

const icons = [CompassIcon, HeartIcon, SparkIcon];

export function LandingBenefits() {
  const { t } = useLocale();
  const m = t.home.benefits as {
    eyebrow: string;
    title: string;
    benefit1Title: string;
    benefit1Copy: string;
    benefit2Title: string;
    benefit2Copy: string;
    benefit3Title: string;
    benefit3Copy: string;
  };

  const items = [
    { title: m.benefit1Title, copy: m.benefit1Copy },
    { title: m.benefit2Title, copy: m.benefit2Copy },
    { title: m.benefit3Title, copy: m.benefit3Copy },
  ];

  return (
    <section
      className="bg-ref-bg py-10 sm:py-14 md:py-20 overflow-x-hidden"
      aria-labelledby="benefits-title"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">
            {m.eyebrow}
          </span>
          <h2
            id="benefits-title"
            className="mt-3 text-responsive-h2 font-semibold tracking-tight text-slate-900"
          >
            {m.title}
          </h2>
        </div>
        <div className="mx-auto mt-8 grid w-full gap-5 sm:mt-12 sm:gap-6 md:grid-cols-3 md:gap-8">
          {items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="flex flex-col items-center rounded-xl border border-ref-border bg-white px-5 py-6 text-center shadow-refCard transition-smooth hover:shadow-cardHover sm:px-6 sm:py-8"
              >
                <Icon className="h-10 w-10 shrink-0 text-ref-primary" />
                <h3 className="mt-4 text-responsive-h3 font-semibold text-ref-heading">
                  {item.title}
                </h3>
                <p className="mt-2 text-responsive-base leading-[1.5] text-ref-body">
                  {item.copy}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
