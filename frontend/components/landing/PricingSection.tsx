"use client";

import Link from "next/link";
import { useLocale } from "@/components/context/LocaleContext";
import Container from "@/components/layout/Container";
import { localePrefix } from "@/lib/i18n";

const freeBullets = [
  "Короткая рефлексия",
  "Понимание интересов",
  "Основа для разговора с родителями",
  "Первичная карта направлений",
];

const paidBullets = [
  "Подбор предметов под цели",
  "Персональный план подготовки",
  "Микрозадания и регулярность",
  "Трек прогресса",
  "Поддержка для родителей",
  "Кабинет школы",
];

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function PricingSection() {
  const { locale } = useLocale();
  const base = localePrefix(locale);

  return (
    <section className="bg-ref-bg py-12 sm:py-16 md:py-20 overflow-x-hidden" aria-labelledby="pricing-title">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="pricing-title"
            className="text-responsive-h2 font-semibold tracking-tight text-ref-heading"
          >
            Начать бесплатно. Двигаться системно — в платформе.
          </h2>
          <p className="mt-3 text-responsive-base text-ref-body">
            Ясность начинается бесплатно. Дальнейший прогресс — с чёткой структурой и поддержкой.
          </p>
        </div>

        <div className="mt-10 sm:mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8 lg:items-stretch">
          {/* Card 1 — Free */}
          <div className="flex flex-col rounded-2xl border border-neutral-border bg-white p-6 sm:p-8 shadow-refCard transition-smooth hover:shadow-cardHover">
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
              Первый шаг
            </span>
            <p className="mt-2 text-responsive-base text-ref-body">
              Лёгкий старт без обязательств — понять себя и обсудить с близкими.
            </p>
            <ul className="mt-6 space-y-3 flex-1">
              {freeBullets.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-responsive-base text-ref-heading">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href={`${base}/clarity`}
              className="mt-8 inline-flex items-center justify-center min-h-touch rounded-lg border-2 border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-smooth hover:bg-slate-50 hover:border-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
            >
              Пройти бесплатно
            </Link>
          </div>

          {/* Card 2 — Full platform (highlighted) */}
          <div className="relative flex flex-col rounded-2xl border-2 border-primary-200 bg-gradient-to-b from-primary-50/60 to-white p-6 sm:p-8 shadow-[0_8px_24px_rgba(59,130,246,0.12)] transition-smooth hover:shadow-[0_12px_32px_rgba(59,130,246,0.14)] lg:scale-[1.02]">
            <span className="absolute top-4 right-4 rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-700">
              Рекомендуем
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary-600">
              Системная подготовка
            </span>
            <p className="mt-2 text-responsive-base text-ref-body">
              От разрозненных мыслей — к структурированной подготовке: план, задачи, прогресс и поддержка семьи и школы.
            </p>
            <ul className="mt-6 space-y-3 flex-1">
              {paidBullets.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-responsive-base text-ref-heading">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-ref-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-primary-100">
              <p className="text-responsive-base text-ref-body">
                <span className="font-medium text-ref-heading">Семейная подписка</span> — от 2–3 $/мес
              </p>
              <p className="mt-1 text-xs text-ref-body">
                Школьные пакеты — по запросу
              </p>
            </div>
            <Link
              href={`${base}/waitlist`}
              className="mt-6 inline-flex items-center justify-center min-h-touch rounded-lg bg-ref-primary px-5 py-2.5 text-sm font-semibold text-white shadow-refCard transition-smooth hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            >
              Получить полный доступ
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
