import type { ClarityAnswers, MirrorResult } from "./types";
import type { ExamPlanResult } from "./types";

/** Result screen uses 3 fixed domains (not professions). */
export type ResultDomainId = "people" | "logic" | "creativity";

export type ReflectionText = {
  enjoy: string;
  think: string;
  learn: string;
};

export type DirectionReason = {
  id: ResultDomainId;
  reason1: string;
  reason2: string;
};

export type NextStepItem = {
  text: string;
};

export type ResultTextInput = {
  answers: ClarityAnswers;
  mirror: MirrorResult;
  examPlan: ExamPlanResult;
  /** Labels from i18n: choices.*, mirror.*, etc. */
  labels: {
    interests: Record<string, string>;
    learn: Record<string, string>;
    situations: Record<string, string>;
    strengths: Record<string, string>;
    feedback: Record<string, string>;
    drains: Record<string, string>;
    learningStyleValues: Record<string, string>;
    /** Template parts for reflection; keys like reflection.enjoySciences, reflection.thinkLogic, etc. */
    reflection: Record<string, string>;
    /** reason1/reason2 per domain */
    directionReasons: Record<ResultDomainId, { reason1: string; reason2: string }>;
    nextStep: Record<string, string>;
  };
};

function getLabel(
  map: Record<string, string> | undefined,
  key: string | undefined,
  fallback: string
): string {
  if (!key || !map) return fallback;
  return map[key] ?? fallback;
}

/** Count how many questions have an answer (excluding empty open text). */
function countAnswers(answers: ClarityAnswers): number {
  return Object.entries(answers).filter(
    ([_, v]) => typeof v === "string" && v.length > 0
  ).length;
}

/**
 * Generate reflection block text from user answers.
 * Softer wording when few answers.
 */
export function getReflectionText(input: ResultTextInput): ReflectionText {
  const { answers, mirror, labels } = input;
  const r = labels.reflection ?? {};
  const soft = countAnswers(input.answers) < 4;

  const q1 = answers["q1_interests"];
  const q5 = answers["q5_situations"];
  const q6 = answers["q6_strengths"];
  const q2 = answers["q2_learn"];
  const q7 = answers["q7_feedback"];
  const q3 = answers["q3_drains"];

  const interestLabel = getLabel(labels.interests, q1, "");
  const situationLabel = getLabel(labels.situations, q5, "");
  const strengthLabel = getLabel(labels.strengths, q6, "");
  const learnLabel = getLabel(labels.learn, q2, "");
  const feedbackLabel = getLabel(labels.feedback, q7, "");
  const drainLabel = getLabel(labels.drains, q3, "");

  const learningStyleKey = (mirror.learningStyle as string) || "";
  const styleSuffix = learningStyleKey.replace(/^mirror\.learningStyle\./, "");
  const learningStyleText =
    getLabel(labels.learningStyleValues, styleSuffix, learnLabel) || learnLabel;

  let enjoy: string;
  let think: string;
  let learn: string;

  if (soft) {
    enjoy = r.enjoySoft ?? "Based on your answers, you tend to choose tasks that involve things you find interesting.";
    think = r.thinkSoft ?? "What matters to you and how you learn are reflected above.";
    learn = r.learnSoft ?? "You seem to move better when you have clarity rather than pressure.";
  } else {
    const part1 = interestLabel && situationLabel
      ? (r.enjoyTemplate ?? "You often choose tasks where there is {{interest}} and {{situation}}.")
          .replace("{{interest}}", interestLabel.toLowerCase?.() ?? interestLabel)
          .replace("{{situation}}", situationLabel.toLowerCase?.() ?? situationLabel)
      : r.enjoyFallback ?? "You often choose tasks that match your interests and situations where you shine.";
    enjoy = part1;

    think = strengthLabel && feedbackLabel
      ? (r.thinkTemplate ?? "What matters to you is {{strength}}, and in learning {{feedback}} helps.")
          .replace("{{strength}}", strengthLabel.toLowerCase?.() ?? strengthLabel)
          .replace("{{feedback}}", feedbackLabel.toLowerCase?.() ?? feedbackLabel)
      : r.thinkFallback ?? "Your strengths and the kind of feedback you like shape how you think.";

    learn = (r.learnTemplate ?? "You seem to move better when there is {{style}} instead of {{drain}}.")
      .replace("{{style}}", learningStyleText.toLowerCase?.() ?? learningStyleText)
      .replace("{{drain}}", drainLabel ? drainLabel.toLowerCase?.() : "pressure");
  }

  return { enjoy, think, learn };
}

/**
 * Three fixed domains with 2 sentences each (from labels + answers).
 */
export function getDirectionReasons(input: ResultTextInput): DirectionReason[] {
  const { answers, labels } = input;
  const reasons = labels.directionReasons ?? {} as Record<ResultDomainId, { reason1: string; reason2: string }>;
  const q1 = answers["q1_interests"];
  const q5 = answers["q5_situations"];

  const domains: ResultDomainId[] = ["people", "logic", "creativity"];
  return domains.map((id) => {
    const d = reasons[id];
    return {
      id,
      reason1: d?.reason1 ?? "",
      reason2: d?.reason2 ?? "",
    };
  });
}

/**
 * Practical next steps: talk to teacher, try club, pay attention to subjects.
 * Generated from examPlan + labels.
 */
export function getNextSteps(input: ResultTextInput): NextStepItem[] {
  const { examPlan, labels } = input;
  const n = labels.nextStep ?? {};
  const subjects = examPlan.subjectsFocus?.slice(0, 2).join(", ") ?? "";

  return [
    { text: (n.talkTeacher ?? "Talk to a teacher about {{subjects}}").replace("{{subjects}}", subjects || "your interests") },
    { text: n.tryClub ?? "Try a club or elective that matches one of your directions." },
    { text: (n.payAttention ?? "Pay attention to {{subjects}} in class.").replace("{{subjects}}", subjects || "subjects you enjoy") },
  ].filter((s) => s.text.length > 0);
}
