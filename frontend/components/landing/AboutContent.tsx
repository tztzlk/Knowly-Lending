"use client";

import { useLocale } from "@/components/context/LocaleContext";
import Container from "@/components/layout/Container";

function IconBullet({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 8 8" aria-hidden>
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function IconTeam({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
  );
}
function IconAcademic({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
    </svg>
  );
}
function IconDocument({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5v-7.5H8.25v7.5Z" />
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

const COMPANY_ICONS = [IconTeam, IconAcademic, IconDocument, IconShield];

export function AboutContent() {
  const { t } = useLocale();
  const a = t.about as {
    mission: { eyebrow: string; title: string; bullets?: string[] };
    story: { eyebrow: string; title: string; bullets?: string[] };
    values: { eyebrow: string; title: string; humanFirst: string; honest: string; inclusive: string };
    company: {
      eyebrow: string;
      title: string;
      cardTeam?: string;
      cardExperts?: string;
      cardMethod?: string;
      cardCommit?: string;
      professional?: string;
      team?: string;
      methodology?: string;
      commitment?: string;
    };
  };

  const missionBullets: string[] = Array.isArray(a.mission.bullets)
    ? a.mission.bullets
    : "body" in a.mission && typeof a.mission.body === "string"
      ? [a.mission.body]
      : [];
  const storyBullets: string[] = Array.isArray(a.story.bullets)
    ? a.story.bullets
    : "body" in a.story && typeof a.story.body === "string"
      ? [a.story.body]
      : [];
  const companyCards = [
    a.company.cardTeam ?? a.company.professional,
    a.company.cardExperts ?? a.company.team,
    a.company.cardMethod ?? a.company.methodology,
    a.company.cardCommit ?? a.company.commitment,
  ].filter(Boolean) as string[];

  return (
    <div className="min-h-[60vh] py-section md:py-sectionLg overflow-x-hidden">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-responsive-h1 font-bold tracking-tight text-ref-heading">
            {(t.about as { title: string }).title}
          </h1>
        </div>

        <section className="mx-auto mt-14 max-w-4xl md:mt-20" aria-labelledby="mission-title">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">
            {a.mission.eyebrow}
          </span>
          <h2 id="mission-title" className="mt-2 text-xl font-semibold text-ref-heading">
            {a.mission.title}
          </h2>
          <ul className="mt-4 space-y-2 text-ref-body">
            {missionBullets.map((bullet, i) => (
              <li key={i} className="flex gap-2">
                <IconBullet className="mt-1.5 h-2 w-2 shrink-0 text-primary-500" />
                <span className="text-sm leading-relaxed md:text-base">{bullet}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto mt-14 max-w-4xl md:mt-20" aria-labelledby="story-title">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">
            {a.story.eyebrow}
          </span>
          <h2 id="story-title" className="mt-2 text-xl font-semibold text-ref-heading">
            {a.story.title}
          </h2>
          <ul className="mt-4 space-y-2 text-ref-body">
            {storyBullets.map((bullet, i) => (
              <li key={i} className="flex gap-2">
                <IconBullet className="mt-1.5 h-2 w-2 shrink-0 text-primary-500" />
                <span className="text-sm leading-relaxed md:text-base">{bullet}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto mt-14 max-w-4xl md:mt-20" aria-labelledby="values-title">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">
            {a.values.eyebrow}
          </span>
          <h2 id="values-title" className="mt-2 text-xl font-semibold text-ref-heading">
            {a.values.title}
          </h2>
          <ul className="mt-4 space-y-2 text-ref-body">
            <li className="flex gap-2">
              <IconBullet className="mt-1.5 h-2 w-2 shrink-0 text-primary-500" />
              <span className="text-sm leading-relaxed md:text-base">{a.values.humanFirst}</span>
            </li>
            <li className="flex gap-2">
              <IconBullet className="mt-1.5 h-2 w-2 shrink-0 text-primary-500" />
              <span className="text-sm leading-relaxed md:text-base">{a.values.honest}</span>
            </li>
            <li className="flex gap-2">
              <IconBullet className="mt-1.5 h-2 w-2 shrink-0 text-primary-500" />
              <span className="text-sm leading-relaxed md:text-base">{a.values.inclusive}</span>
            </li>
          </ul>
        </section>

        <section
          className="mx-auto mt-14 max-w-4xl md:mt-20"
          aria-labelledby="company-title"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">
            {a.company.eyebrow}
          </span>
          <h2 id="company-title" className="mt-2 text-xl font-semibold text-ref-heading md:text-2xl">
            {a.company.title}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {companyCards.map((text, i) => {
              const Icon = COMPANY_ICONS[i] ?? IconDocument;
              return (
                <div
                  key={i}
                  className="flex gap-3 rounded-xl border border-ref-border bg-white p-5 shadow-subtle transition-smooth hover:shadow-cardHover motion-safe:animate-fade-in"
                >
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-ref-primary" aria-hidden />
                  <p className="text-sm leading-relaxed text-ref-body">{text}</p>
                </div>
              );
            })}
          </div>
        </section>
      </Container>
    </div>
  );
}
