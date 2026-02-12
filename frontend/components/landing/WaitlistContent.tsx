"use client";

import { useState } from "react";
import { useLocale } from "@/components/context/LocaleContext";
import Container from "@/components/layout/Container";
import { WaitlistForm } from "@/components/landing/WaitlistForm";

export function WaitlistContent() {
  const { t } = useLocale();
  const w = t.waitlist as {
    headline: string;
    subhead: string;
    perks: { title: string; early: string; updates: string; voice: string };
  };

  return (
    <div className="min-h-[60vh] py-section md:py-sectionLg overflow-x-hidden">
      <Container className="max-w-content-mobile sm:max-w-xl">
        <h1 className="text-responsive-h1 font-bold tracking-tight text-ref-heading">
          {w.headline}
        </h1>
        <p className="mt-4 text-responsive-base leading-[1.5] text-ref-body">{w.subhead}</p>

        <WaitlistForm className="mt-8 sm:mt-10" />

        <section className="mt-10 sm:mt-14" aria-labelledby="perks-title">
          <h2 id="perks-title" className="text-responsive-h3 font-semibold text-ref-heading">
            {w.perks.title}
          </h2>
          <ul className="mt-4 space-y-2 text-responsive-base leading-[1.5] text-ref-body">
            <li>• {w.perks.early}</li>
            <li>• {w.perks.updates}</li>
            <li>• {w.perks.voice}</li>
          </ul>
        </section>
      </Container>
    </div>
  );
}
