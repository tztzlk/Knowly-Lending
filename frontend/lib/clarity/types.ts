/** Question IDs used in the clarity flow (10 questions). */
export const QUESTION_IDS = [
  "q1_interests",
  "q2_learn",
  "q3_drains",
  "q4_exams",
  "q5_situations",
  "q6_strengths",
  "q7_feedback",
  "q8_goals",
  "q9_obstacles",
  "q10_open",
] as const;

export type QuestionId = (typeof QUESTION_IDS)[number];

/** Direction IDs for step 3 (3–5 options from mapping). */
export const DIRECTION_IDS = [
  "sciences",
  "humanities",
  "arts",
  "tech",
  "mixed",
] as const;

export type DirectionId = (typeof DIRECTION_IDS)[number];

/** Answers: choice keys + optional open text. */
export type ClarityAnswers = Partial<Record<QuestionId, string>>;

/** Mirror result: interests cluster, strengths, learning style, risks. */
export type MirrorResult = {
  interestsCluster: string[];
  strengths: string[];
  learningStyle: string;
  risks: string[];
};

/** Single direction option for step 3 (labelKey/descriptionKey for i18n). */
export type DirectionOption = {
  id: DirectionId;
  labelKey: string;
  descriptionKey: string;
};

/** Exam plan: subjects focus, weekly format, habits. */
export type ExamPlanResult = {
  subjectsFocus: string[];
  weeklyFormat: string;
  habits: string[];
};
