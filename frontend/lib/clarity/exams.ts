import type { ClarityAnswers } from "./types";
import type { ExamPlanResult } from "./types";

/** Map interests + exam attitude to subjects focus and format — no AI. */
const INTEREST_TO_SUBJECTS: Record<string, string[]> = {
  sciences: ["math", "physics", "chemistry", "biology"],
  humanities: ["history", "literature", "languages", "social studies"],
  arts: ["art", "music", "literature"],
  tech: ["math", "informatics", "physics"],
  mixed: ["math", "literature", "languages", "one science"],
};

const EXAM_ATTITUDE_TO_FORMAT: Record<string, string> = {
  stressed: "exam_format_stressed",
  okay: "exam_format_okay",
  challenge: "exam_format_challenge",
  avoid: "exam_format_avoid",
};

const DRAINS_TO_HABITS: Record<string, string> = {
  routine: "habit_routine",
  unclear_goals: "habit_goals",
  too_social: "habit_social",
  too_alone: "habit_alone",
  exams: "habit_exams",
};

export function getExamPlan(answers: ClarityAnswers): ExamPlanResult {
  const q1 = answers["q1_interests"];
  const subjectsFocus =
    (typeof q1 === "string" && INTEREST_TO_SUBJECTS[q1]) ||
    INTEREST_TO_SUBJECTS.mixed;

  const q4 = answers["q4_exams"];
  const weeklyFormatKey =
    (typeof q4 === "string" && EXAM_ATTITUDE_TO_FORMAT[q4]) || "exam_format_okay";

  const q3 = answers["q3_drains"];
  const habitKey = typeof q3 === "string" && DRAINS_TO_HABITS[q3] ? DRAINS_TO_HABITS[q3] : "habit_default";

  return {
    subjectsFocus,
    weeklyFormat: weeklyFormatKey,
    habits: [habitKey],
  };
}
