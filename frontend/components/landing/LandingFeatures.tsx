"use client";

import { useLocale } from "@/components/context/LocaleContext";
import Container from "@/components/layout/Container";

/* ----- Reflections: note mock + progress line chart ----- */
function ReflectionsVisual() {
  return (
    <div className="flex flex-col gap-4">
      {/* Mock note card */}
      <div className="rounded-xl border border-ref-border bg-white p-4 shadow-subtle transition-smooth hover:shadow-cardHover">
        <div className="flex items-center gap-2 text-xs text-ref-body">
          <span className="h-2 w-2 rounded-full bg-primary-400" />
          Today&apos;s reflection
        </div>
        <div className="mt-2 space-y-1.5">
          <div className="h-2 w-full max-w-[90%] rounded bg-primary-100" />
          <div className="h-2 w-full max-w-[70%] rounded bg-primary-100/80" />
          <div className="h-2 w-full max-w-[50%] rounded bg-primary-100/60" />
        </div>
      </div>
      {/* Progress line chart (SVG) */}
      <div className="rounded-lg bg-neutral-muted/80 p-3">
        <p className="mb-2 text-xs font-medium text-ref-heading">Progress</p>
        <svg viewBox="0 0 200 60" className="h-14 w-full" aria-hidden>
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <path
            d="M 0 50 Q 40 45 80 35 T 160 15 T 200 5"
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="1"
            strokeDashoffset="1"
            style={{
              animation: "draw-line 1.4s ease-out forwards",
            }}
          />
          <circle
            cx="200"
            cy="5"
            r="4"
            fill="#3b82f6"
            className="opacity-0 motion-safe:animate-fade-in"
            style={{ animationDelay: "1s", animationFillMode: "forwards" }}
          />
        </svg>
      </div>
    </div>
  );
}

/* ----- Tests: quiz mock with instant check + hint ----- */
function TestsVisual() {
  return (
    <div className="rounded-xl border border-ref-border bg-white p-4 shadow-subtle transition-smooth hover:shadow-cardHover">
      <p className="text-xs font-medium text-ref-heading">Q. What is 2 + 2?</p>
      <ul className="mt-3 space-y-2">
        {[
          { label: "3", correct: false },
          { label: "4", correct: true },
          { label: "5", correct: false },
        ].map((opt, i) => (
          <li
            key={i}
            className={`flex items-center justify-between rounded-lg border px-3 py-2 text-sm ${
              opt.correct
                ? "border-green-300 bg-green-50 text-green-800"
                : "border-ref-border bg-neutral-muted/50 text-ref-body"
            }`}
          >
            <span>{opt.label}</span>
            {opt.correct && (
              <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-3 flex gap-2">
        <span className="rounded-md bg-primary-100 px-2 py-1 text-xs text-primary-700">✓ Verified</span>
        <span className="rounded-md bg-amber-100 px-2 py-1 text-xs text-amber-800">💡 Hint</span>
      </div>
    </div>
  );
}

/* ----- Progress: bar chart + achievements ----- */
function ProgressVisual() {
  const bars = [72, 88, 65, 90, 78];
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg bg-neutral-muted/80 p-3">
        <p className="mb-2 text-xs font-medium text-ref-heading">Knowledge by topic</p>
        <div className="flex items-end justify-between gap-1 h-12">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-primary-400 origin-bottom motion-safe:animate-fill-bars"
              style={{
                height: `${h}%`,
                animationDelay: `${i * 0.1}s`,
                animationFillMode: "forwards",
              }}
            />
          ))}
        </div>
        <div className="mt-1 flex justify-between text-[10px] text-ref-body">
          <span>A</span>
          <span>B</span>
          <span>C</span>
          <span>D</span>
          <span>E</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {["First quiz", "5 in a row", "Week streak"].map((badge, i) => (
          <span
            key={i}
            className="rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-700"
          >
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ----- Platform UI mock: browser-style frames ----- */
function InterfaceVisual() {
  return (
    <div className="flex flex-col gap-3">
      {/* Browser-style window */}
      <div className="rounded-xl border border-ref-border bg-white shadow-card overflow-hidden motion-safe:animate-float">
        <div className="flex items-center gap-2 border-b border-ref-border bg-neutral-muted/60 px-3 py-2">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-300" />
            <span className="h-2 w-2 rounded-full bg-amber-300" />
            <span className="h-2 w-2 rounded-full bg-green-300" />
          </div>
          <div className="ml-2 flex-1 rounded-md bg-white py-1 px-2 text-[10px] text-ref-body">
            app.knowly.io
          </div>
        </div>
        <div className="flex min-h-[100px]">
          <aside className="w-16 border-r border-ref-border bg-neutral-muted/40 p-2">
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-6 rounded bg-white shadow-subtle" />
              ))}
            </div>
          </aside>
          <main className="flex-1 p-3">
            <div className="h-3 w-24 rounded bg-ref-heading/10 mb-3" />
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 rounded-lg bg-primary-50 border border-primary-100" />
              ))}
            </div>
          </main>
        </div>
      </div>
      {/* Small device mock */}
      <div className="flex justify-end">
        <div className="w-20 rounded-lg border-2 border-ref-border bg-white p-1.5 shadow-subtle">
          <div className="aspect-[9/16] rounded-md bg-neutral-muted/80 flex flex-col p-2 gap-2">
            <div className="h-2 w-8 rounded bg-ref-heading/20" />
            <div className="flex-1 rounded bg-primary-50/80" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function LandingFeatures() {
  const { t } = useLocale();
  const m = t.home.features as {
    eyebrow: string;
    title: string;
    reflectionsTitle: string;
    reflectionsCopy: string;
    testsTitle: string;
    testsCopy: string;
    progressTitle: string;
    progressCopy: string;
    interfaceTitle: string;
    interfaceCopy: string;
  };

  const features = [
    {
      title: m.reflectionsTitle,
      copy: m.reflectionsCopy,
      visual: <ReflectionsVisual />,
    },
    {
      title: m.testsTitle,
      copy: m.testsCopy,
      visual: <TestsVisual />,
    },
    {
      title: m.progressTitle,
      copy: m.progressCopy,
      visual: <ProgressVisual />,
    },
    {
      title: m.interfaceTitle,
      copy: m.interfaceCopy,
      visual: <InterfaceVisual />,
    },
  ];

  return (
    <section
      className="bg-neutral-muted/40 py-10 sm:py-14 md:py-20 overflow-x-hidden"
      aria-labelledby="features-title"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">
            {m.eyebrow}
          </span>
          <h2
            id="features-title"
            className="mt-3 text-responsive-h2 font-semibold tracking-tight text-ref-heading"
          >
            {m.title}
          </h2>
        </div>

        <div className="mx-auto mt-10 grid w-full gap-10 sm:mt-14 md:grid-cols-2 lg:gap-12">
          {features.map((feat, i) => (
            <div
              key={i}
              className="flex flex-col rounded-2xl border border-ref-border bg-white p-6 shadow-subtle transition-smooth hover:shadow-cardHover motion-safe:animate-fade-in sm:p-8"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="mb-4 min-h-[140px] flex items-center justify-center rounded-xl bg-ref-bg/80 p-4">
                {feat.visual}
              </div>
              <h3 className="text-responsive-h3 font-semibold text-ref-heading">
                {feat.title}
              </h3>
              <p className="mt-2 text-responsive-base leading-[1.5] text-ref-body">
                {feat.copy}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
