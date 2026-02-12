import type { QuestionId } from "./types";

export type QuestionType = "choice" | "choice_open";

export type ChoiceOption = {
  value: string;
  labelKey: string;
};

export type ClarityQuestion = {
  id: QuestionId;
  questionKey: string;
  type: QuestionType;
  choices?: ChoiceOption[];
  placeholderKey?: string;
};

/** 10 short questions: interests, how I learn, drains, exams, real situations. */
export const CLARITY_QUESTIONS: ClarityQuestion[] = [
  {
    id: "q1_interests",
    questionKey: "q1",
    type: "choice",
    choices: [
      { value: "sciences", labelKey: "interests.sciences" },
      { value: "humanities", labelKey: "interests.humanities" },
      { value: "arts", labelKey: "interests.arts" },
      { value: "tech", labelKey: "interests.tech" },
      { value: "mixed", labelKey: "interests.mixed" },
    ],
  },
  {
    id: "q2_learn",
    questionKey: "q2",
    type: "choice",
    choices: [
      { value: "reading", labelKey: "learn.reading" },
      { value: "doing", labelKey: "learn.doing" },
      { value: "talking", labelKey: "learn.talking" },
      { value: "visual", labelKey: "learn.visual" },
      { value: "mixed_learn", labelKey: "learn.mixed" },
    ],
  },
  {
    id: "q3_drains",
    questionKey: "q3",
    type: "choice",
    choices: [
      { value: "routine", labelKey: "drains.routine" },
      { value: "unclear_goals", labelKey: "drains.unclear_goals" },
      { value: "too_social", labelKey: "drains.too_social" },
      { value: "too_alone", labelKey: "drains.too_alone" },
      { value: "exams", labelKey: "drains.exams" },
    ],
  },
  {
    id: "q4_exams",
    questionKey: "q4",
    type: "choice",
    choices: [
      { value: "stressed", labelKey: "exams.stressed" },
      { value: "okay", labelKey: "exams.okay" },
      { value: "challenge", labelKey: "exams.challenge" },
      { value: "avoid", labelKey: "exams.avoid" },
    ],
  },
  {
    id: "q5_situations",
    questionKey: "q5",
    type: "choice_open",
    choices: [
      { value: "team", labelKey: "situations.team" },
      { value: "solo", labelKey: "situations.solo" },
      { value: "creative", labelKey: "situations.creative" },
      { value: "analytical", labelKey: "situations.analytical" },
      { value: "helping", labelKey: "situations.helping" },
    ],
    placeholderKey: "situation",
  },
  {
    id: "q6_strengths",
    questionKey: "q6",
    type: "choice_open",
    choices: [
      { value: "patience", labelKey: "strengths.patience" },
      { value: "curiosity", labelKey: "strengths.curiosity" },
      { value: "creativity", labelKey: "strengths.creativity" },
      { value: "logic", labelKey: "strengths.logic" },
      { value: "communication", labelKey: "strengths.communication" },
    ],
    placeholderKey: "strength",
  },
  {
    id: "q7_feedback",
    questionKey: "q7",
    type: "choice",
    choices: [
      { value: "written", labelKey: "feedback.written" },
      { value: "verbal", labelKey: "feedback.verbal" },
      { value: "grades", labelKey: "feedback.grades" },
      { value: "try_again", labelKey: "feedback.try_again" },
    ],
  },
  {
    id: "q8_goals",
    questionKey: "q8",
    type: "choice_open",
    choices: [
      { value: "university", labelKey: "goals.university" },
      { value: "skill", labelKey: "goals.skill" },
      { value: "explore", labelKey: "goals.explore" },
      { value: "balance", labelKey: "goals.balance" },
    ],
    placeholderKey: "goal",
  },
  {
    id: "q9_obstacles",
    questionKey: "q9",
    type: "choice",
    choices: [
      { value: "time", labelKey: "obstacles.time" },
      { value: "motivation", labelKey: "obstacles.motivation" },
      { value: "stress", labelKey: "obstacles.stress" },
      { value: "uncertainty", labelKey: "obstacles.uncertainty" },
    ],
  },
  {
    id: "q10_open",
    questionKey: "q10",
    type: "choice_open",
    choices: [],
    placeholderKey: "open",
  },
];
