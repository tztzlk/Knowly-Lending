"use client";

import { useLocale } from "@/components/context/LocaleContext";
import Container from "@/components/layout/Container";

function IconPuzzle({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355-.186-.676-.401-.959-.221-.29-.49-.514-.82-.666a3.779 3.779 0 0 0-1.028-.432A.75.75 0 0 0 11.25 4v8.25c0 .414.336.75.75.75h8.25a.75.75 0 0 0 .53-.22c.073-.072.14-.15.2-.233.062-.087.12-.18.166-.278.047-.098.082-.2.105-.304.023-.104.034-.21.034-.317 0-.355-.186-.676-.401-.959a3.745 3.745 0 0 0-.82-.666 3.618 3.618 0 0 0-1.028-.432 2.25 2.25 0 0 0-1.596 0 3.618 3.618 0 0 0-1.028.432 3.74 3.74 0 0 0-.82.666c-.215.283-.401.604-.401.959 0 .107.011.213.034.317.023.104.058.206.105.304.046.098.104.19.166.278.06.083.127.161.2.233a.75.75 0 0 0 .53.22h8.25a.75.75 0 0 0 .75-.75V6.087Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 15.75V18m0 0h2.25m-2.25 0h-2.25m0-2.25H9.75m2.25-6.75v.75m0 0h-1.5m1.5 0h1.5m-1.5 0H9.75m0 0H8.25m1.5 0v-.75M9.75 12h1.5m-1.5 0H8.25m0 0h-1.5m0 0V9.75m0 6.75v.75m0-4.5v3" />
    </svg>
  );
}
function IconClipboard({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
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
function IconArrowPath({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 4.937-2.23 2.23-4.937-4.937 2.23-2.23 4.937ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.437.937-.937a2.25 2.25 0 0 0 0-3.182l-.937-.937M12 21l-.937-.937a2.25 2.25 0 0 1 0-3.182l.937-.937" />
    </svg>
  );
}
function IconLightBulb({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  );
}

const PROBLEM_ICONS = [IconPuzzle, IconClipboard, IconUsers, IconArrowPath, IconLightBulb];

export function LandingProblem() {
  const { t } = useLocale();
  const m = t.home.problem as {
    eyebrow: string;
    title: string;
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    p5: string;
  };
  const points = [m.p1, m.p2, m.p3, m.p4, m.p5];

  return (
    <section
      className="bg-neutral-muted py-10 sm:py-14 md:py-20 overflow-x-hidden"
      aria-labelledby="problem-title"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">
            {m.eyebrow}
          </span>
          <h2
            id="problem-title"
            className="mt-3 text-responsive-h2 font-semibold tracking-tight text-ref-heading"
          >
            {m.title}
          </h2>
        </div>
        <ul className="mx-auto mt-8 grid w-full gap-3 sm:mt-10 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {points.map((text, i) => {
            const Icon = PROBLEM_ICONS[i];
            return (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl border border-ref-border bg-white p-4 shadow-subtle transition-smooth hover:shadow-cardHover motion-safe:animate-fade-in"
              >
                <Icon className="mt-0.5 h-6 w-6 shrink-0 text-ref-primary" aria-hidden />
                <span className="text-responsive-base leading-[1.5] text-ref-body">{text}</span>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
