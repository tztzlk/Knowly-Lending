"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale } from "@/components/context/LocaleContext";
import Container from "@/components/layout/Container";
import { ClarityResult } from "@/components/results/ClarityResult";
import type { ClarityAnswers, MirrorResult, ExamPlanResult } from "@/lib/clarity";
import { localePrefix } from "@/lib/i18n";

const STORAGE_KEY = "clarity_result";

type StoredResult = {
  answers: ClarityAnswers;
  mirror?: MirrorResult;
  examPlan?: ExamPlanResult;
};

export default function ClarityResultsPage() {
  const { locale } = useLocale();
  const base = localePrefix(locale);
  const [data, setData] = useState<StoredResult | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoredResult;
        if (parsed?.answers && typeof parsed.answers === "object") {
          setData(parsed);
        }
      }
    } catch {
      // ignore
    }
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-[40vh] py-section overflow-x-hidden">
        <Container className="max-w-content-mobile sm:max-w-xl md:max-w-2xl">
          <p className="text-responsive-base text-ref-body">…</p>
        </Container>
      </div>
    );
  }

  if (!data?.answers) {
    return (
      <div className="min-h-[40vh] py-section overflow-x-hidden">
        <Container className="max-w-content-mobile sm:max-w-xl md:max-w-2xl text-center">
          <h1 className="text-responsive-h2 font-semibold text-ref-heading">
            {locale === "ru"
              ? "Сначала пройдите тест ясности"
              : locale === "kz"
                ? "Алдымен айқындық тестін тапсырыңыз"
                : "Complete the Clarity Test first"}
          </h1>
          <p className="mt-2 text-responsive-base leading-[1.5] text-ref-body">
            {locale === "ru"
              ? "Ответьте на вопросы, чтобы увидеть результаты."
              : locale === "kz"
                ? "Нәтижелерді көру үшін сұрақтарға жауап беріңіз."
                : "Answer the questions to see your results."}
          </p>
          <Link
            href={`${base}/clarity`}
            className="mt-6 inline-flex min-h-touch items-center justify-center rounded-lg bg-ref-primary px-5 py-3 text-base font-semibold text-white transition-smooth hover:bg-ref-primary/90 md:min-h-0 md:py-2.5 md:text-sm"
          >
            {locale === "ru" ? "К тесту" : locale === "kz" ? "Тестке" : "Go to test"}
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <ClarityResult
      answers={data.answers}
      mirror={data.mirror}
      examPlan={data.examPlan}
    />
  );
}
