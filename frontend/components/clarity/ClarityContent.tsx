"use client";

import { useState, useCallback, useEffect } from "react";
import { useLocale } from "@/components/context/LocaleContext";
import Container from "@/components/layout/Container";
import {
  CLARITY_QUESTIONS,
  getMirror,
  getDirectionOptions,
  getExamPlan,
  type ClarityAnswers,
  type QuestionId,
  type DirectionId,
} from "@/lib/clarity";
import { ClarityResult } from "@/components/results/ClarityResult";

const STEPS = [1, 2, 3, 4] as const;
type Step = (typeof STEPS)[number];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

export function ClarityContent() {
  const { t } = useLocale();
  const isMobile = useIsMobile();
  const c = (t as { clarity?: Record<string, unknown> }).clarity ?? {};
  const questions = (c.questions ?? {}) as Record<string, string>;
  const choices = (c.choices ?? {}) as Record<string, Record<string, string>>;
  const placeholders = (c.placeholders ?? {}) as Record<string, string>;
  const mirrorLabels = (c.mirror ?? {}) as Record<string, unknown>;
  const directionsObj = (c.directions ?? {}) as Record<string, { label: string; desc: string }>;
  const examsHelper = (c.examsHelper ?? {}) as Record<string, unknown>;
  const formatLabels = (examsHelper.format ?? {}) as Record<string, string>;
  const habitLabels = (examsHelper.habit ?? {}) as Record<string, string>;

  const [step, setStep] = useState<Step>(1);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<ClarityAnswers>({});
  const [openTexts, setOpenTexts] = useState<Partial<Record<QuestionId, string>>>({});
  const [chosenDirections, setChosenDirections] = useState<DirectionId[]>([]);

  const totalQuestions = CLARITY_QUESTIONS.length;
  const progress =
    step === 1 && isMobile
      ? ((questionIndex + 1) / totalQuestions) * 25
      : (step / 4) * 100;

  const setAnswer = useCallback((id: QuestionId, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }, []);

  const setOpenText = useCallback((id: QuestionId, value: string) => {
    setOpenTexts((prev) => ({ ...prev, [id]: value }));
  }, []);

  const toggleDirection = useCallback((id: DirectionId) => {
    setChosenDirections((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  }, []);

  const mirror = getMirror(answers);
  const directionOptions = getDirectionOptions(answers);
  const examPlan = getExamPlan(answers);

  const learningStyleKey = (mirror.learningStyle as string) || "";
  const learningStyleSuffix = learningStyleKey.replace(/^mirror\.learningStyle\./, "");
  const learningStyleText =
    typeof mirrorLabels.learningStyleValues === "object" && mirrorLabels.learningStyleValues
      ? (mirrorLabels.learningStyleValues as Record<string, string>)[learningStyleSuffix] ?? learningStyleKey
      : learningStyleKey;

  useEffect(() => {
    if (step === 4 && typeof window !== "undefined") {
      try {
        window.sessionStorage.setItem(
          "clarity_result",
          JSON.stringify({ answers, mirror, examPlan })
        );
      } catch {
        // ignore
      }
    }
  }, [step, answers, mirror, examPlan]);

  const choiceButtonClass = (selected: boolean) =>
    `min-h-touch rounded-input border px-4 py-3 text-base transition-smooth md:min-h-0 md:py-1.5 md:text-sm ${
      selected
        ? "border-ref-primary bg-primary-50 text-ref-primary"
        : "border-neutral-border bg-white text-ref-body hover:border-ref-border"
    }`;

  const renderQuestionCard = (q: (typeof CLARITY_QUESTIONS)[number], idx: number) => (
    <div
      key={q.id}
      className="w-full rounded-card border border-ref-border bg-white p-4 shadow-subtle md:p-4"
    >
      <label className="block text-responsive-base font-medium text-ref-heading">
        {questions[q.questionKey] ?? `Q${idx + 1}`}
      </label>
      {q.type === "choice_open" && q.choices && q.choices.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {q.choices.map((opt) => {
            const [group, key] = opt.labelKey.split(".");
            const label = choices[group]?.[key] ?? opt.labelKey;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setAnswer(q.id, opt.value)}
                className={choiceButtonClass(answers[q.id] === opt.value)}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}
      {q.type === "choice" && q.choices && (
        <div className="mt-3 flex flex-wrap gap-2">
          {q.choices.map((opt) => {
            const [group, key] = opt.labelKey.split(".");
            const label = choices[group]?.[key] ?? opt.labelKey;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setAnswer(q.id, opt.value)}
                className={choiceButtonClass(answers[q.id] === opt.value)}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}
      {q.type === "choice_open" && (
        <input
          type="text"
          value={openTexts[q.id] ?? ""}
          onChange={(e) => setOpenText(q.id, e.target.value)}
          placeholder={q.placeholderKey ? placeholders[q.placeholderKey] : ""}
          className="mt-3 w-full min-h-touch rounded-input border border-neutral-border px-3 py-3 text-base placeholder:text-slate-400 focus:border-ref-primary focus:outline-none focus:ring-2 focus:ring-primary-100 md:min-h-0 md:py-2 md:text-sm"
        />
      )}
    </div>
  );

  return (
    <div className="min-h-[60vh] py-section md:py-sectionLg overflow-x-hidden">
      <Container className="max-w-content-mobile sm:max-w-xl md:max-w-2xl">
        <h1 className="text-responsive-h1 font-bold tracking-tight text-ref-heading">
          {(c as { title?: string }).title ?? "Clarity"}
        </h1>
        <p className="mt-2 text-responsive-base leading-[1.5] text-ref-body">
          {(c as { metaDescription?: string }).metaDescription ??
            "Reflect on your interests and strengths. No AI—just your answers."}
        </p>

        {/* Progress bar - always visible */}
        <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-neutral-borderLight">
          <div
            className="h-full rounded-full bg-ref-primary transition-all duration-300 motion-safe:transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step 1: Questions - one per screen on mobile */}
        {step === 1 && isMobile && (
          <div className="mt-8 flex flex-col items-center">
            <h2 className="text-responsive-h3 font-semibold text-ref-heading">
              {(c as { step1Title?: string }).step1Title ?? "Questions"}
            </h2>
            <p className="mt-1 text-sm text-ref-body">
              {questionIndex + 1} / {totalQuestions}
            </p>
            <div className="mt-6 w-full max-w-[430px]">
              {renderQuestionCard(CLARITY_QUESTIONS[questionIndex], questionIndex)}
            </div>
            <div className="mt-8 flex w-full max-w-[430px] gap-3">
              {questionIndex > 0 ? (
                <button
                  type="button"
                  onClick={() => setQuestionIndex((i) => i - 1)}
                  className="min-h-touch flex-1 rounded-lg border border-ref-border bg-white px-4 py-3 text-base font-medium text-ref-heading transition-smooth hover:bg-neutral-muted"
                >
                  {(c as { back?: string }).back ?? "Back"}
                </button>
              ) : (
                <span />
              )}
              <button
                type="button"
                onClick={() => {
                  if (questionIndex < totalQuestions - 1) {
                    setQuestionIndex((i) => i + 1);
                  } else {
                    setStep(2);
                  }
                }}
                className="min-h-touch flex-1 rounded-lg bg-ref-primary px-5 py-3 text-base font-semibold text-white transition-smooth hover:bg-ref-primary/90"
              >
                {(c as { next?: string }).next ?? "Next"}
              </button>
            </div>
          </div>
        )}

        {step === 1 && !isMobile && (
          <div className="mt-8 space-y-6">
            <h2 className="text-responsive-h3 font-semibold text-ref-heading">
              {(c as { step1Title?: string }).step1Title ?? "Questions"}
            </h2>
            {CLARITY_QUESTIONS.map((q, idx) => renderQuestionCard(q, idx))}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="min-h-touch rounded-lg bg-ref-primary px-5 py-3 text-base font-semibold text-white transition-smooth hover:bg-ref-primary/90 md:min-h-0 md:py-2.5 md:text-sm"
              >
                {(c as { next?: string }).next ?? "Next"}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Mirror */}
        {step === 2 && (
          <div className="mt-8 space-y-4">
            <h2 className="text-responsive-h3 font-semibold text-ref-heading">
              {(c as { step2Title?: string }).step2Title ?? "Your reflection"}
            </h2>
            <div className="grid w-full gap-3 sm:grid-cols-2 sm:gap-4">
              <div className="w-full rounded-card border border-ref-border bg-white p-4 shadow-subtle">
                <h3 className="text-responsive-base font-medium text-ref-body">
                  {(mirrorLabels as { interestsCluster?: string }).interestsCluster ?? "Interests"}
                </h3>
                <p className="mt-1 text-responsive-base leading-[1.5] text-ref-heading">
                  {mirror.interestsCluster.join(", ")}
                </p>
              </div>
              <div className="w-full rounded-card border border-ref-border bg-white p-4 shadow-subtle">
                <h3 className="text-responsive-base font-medium text-ref-body">
                  {(mirrorLabels as { strengths?: string }).strengths ?? "Strengths"}
                </h3>
                <p className="mt-1 text-responsive-base leading-[1.5] text-ref-heading">{mirror.strengths.join(", ")}</p>
              </div>
              <div className="w-full rounded-card border border-ref-border bg-white p-4 shadow-subtle sm:col-span-2">
                <h3 className="text-responsive-base font-medium text-ref-body">
                  {(mirrorLabels as { learningStyle?: string }).learningStyle ?? "Learning style"}
                </h3>
                <p className="mt-1 text-responsive-base leading-[1.5] text-ref-heading">{learningStyleText}</p>
              </div>
              <div className="w-full rounded-card border border-ref-border bg-white p-4 shadow-subtle sm:col-span-2">
                <h3 className="text-responsive-base font-medium text-ref-body">
                  {(mirrorLabels as { risks?: string }).risks ?? "Things to watch"}
                </h3>
                <p className="mt-1 text-responsive-base leading-[1.5] text-ref-heading">{mirror.risks.join(", ")}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  if (isMobile) setQuestionIndex(totalQuestions - 1);
                }}
                className="min-h-touch rounded-lg border border-ref-border bg-white px-4 py-3 text-base font-medium text-ref-heading transition-smooth hover:bg-neutral-muted md:min-h-0 md:py-2.5 md:text-sm"
              >
                {(c as { back?: string }).back ?? "Back"}
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="min-h-touch rounded-lg bg-ref-primary px-5 py-3 text-base font-semibold text-white transition-smooth hover:bg-ref-primary/90 md:min-h-0 md:py-2.5 md:text-sm"
              >
                {(c as { next?: string }).next ?? "Next"}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Directions */}
        {step === 3 && (
          <div className="mt-8 space-y-4">
            <h2 className="text-responsive-h3 font-semibold text-ref-heading">
              {(c as { step3Title?: string }).step3Title ?? "Directions"}
            </h2>
            <p className="text-responsive-base leading-[1.5] text-ref-body">
              {(directionsObj as { title?: string }).title ??
                "Directions that fit your answers"}
              {" — "}
              {(directionsObj as { subtitle?: string }).subtitle ??
                "Based only on your choices. Pick what resonates."}
            </p>
            <div className="grid w-full gap-3 sm:grid-cols-2">
              {directionOptions.map((opt) => {
                const dir = directionsObj[opt.labelKey];
                const label = dir?.label ?? opt.id;
                const desc = dir?.desc ?? "";
                const selected = chosenDirections.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleDirection(opt.id)}
                    className={`min-h-touch w-full rounded-card border p-4 text-left shadow-subtle transition-smooth md:min-h-0 ${
                      selected
                        ? "border-ref-primary bg-primary-50 ring-2 ring-ref-primary/30"
                        : "border-ref-border bg-white hover:border-ref-border"
                    }`}
                  >
                    <span className="font-medium text-ref-heading">{label}</span>
                    <p className="mt-1 text-responsive-base text-ref-body">{desc}</p>
                  </button>
                );
              })}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="min-h-touch rounded-lg border border-ref-border bg-white px-4 py-3 text-base font-medium text-ref-heading transition-smooth hover:bg-neutral-muted md:min-h-0 md:py-2.5 md:text-sm"
              >
                {(c as { back?: string }).back ?? "Back"}
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="min-h-touch rounded-lg bg-ref-primary px-5 py-3 text-base font-semibold text-white transition-smooth hover:bg-ref-primary/90 md:min-h-0 md:py-2.5 md:text-sm"
              >
                {(c as { next?: string }).next ?? "Next"}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Result Screen — pb for sticky CTA on mobile */}
        {step === 4 && (
          <div className="mt-8 pb-24 sm:pb-0">
            <ClarityResult answers={answers} mirror={mirror} examPlan={examPlan} />
            <div className="mt-6 flex justify-start">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="min-h-touch rounded-lg border border-ref-border bg-white px-4 py-3 text-base font-medium text-ref-heading transition-smooth hover:bg-neutral-muted md:min-h-0 md:py-2.5 md:text-sm"
              >
                {(c as { back?: string }).back ?? "Back"}
              </button>
            </div>
          </div>
        )}

        {/* Ethics block */}
        <section
          className="mt-10 rounded-card border border-ref-border bg-neutral-muted/50 p-4 sm:mt-12"
          aria-labelledby="ethics-title"
        >
          <h2 id="ethics-title" className="text-responsive-base font-semibold text-ref-heading">
            {(c.ethics as { title?: string })?.title ?? "How this works"}
          </h2>
          <ul className="mt-2 space-y-1 text-responsive-base leading-[1.5] text-ref-body">
            <li>• {(c.ethics as { noPrediction?: string })?.noPrediction ?? "We don't predict your career."}</li>
            <li>• {(c.ethics as { noHeavyAI?: string })?.noHeavyAI ?? "Results come from your answers only—no AI deciding for you."}</li>
            <li>• {(c.ethics as { transparent?: string })?.transparent ?? "Logic is transparent: interests and answers map to directions."}</li>
          </ul>
        </section>
      </Container>
    </div>
  );
}
