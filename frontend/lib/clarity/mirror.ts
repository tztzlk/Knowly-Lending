import type { ClarityAnswers, MirrorResult } from "./types";
import { QUESTION_IDS } from "./types";

/** Map interest value → cluster labels (for mirror). */
const INTEREST_CLUSTER: Record<string, string[]> = {
  sciences: ["Sciences", "Math", "Experiments"],
  humanities: ["History", "Languages", "Society"],
  arts: ["Art", "Music", "Creative expression"],
  tech: ["Tech", "Logic", "Building things"],
  mixed: ["Several areas", "Curiosity", "Exploring"],
};

/** Map learn value → strength labels. */
const LEARN_TO_STRENGTHS: Record<string, string[]> = {
  reading: ["Focus", "Understanding texts"],
  doing: ["Hands-on", "Practice"],
  talking: ["Communication", "Ideas in words"],
  visual: ["Visual thinking", "Patterns"],
  mixed_learn: ["Flexible", "Different ways"],
};

/** Map learn value → learning style label key (for i18n). */
const LEARN_TO_STYLE_KEY: Record<string, string> = {
  reading: "mirror.learningStyle.reading",
  doing: "mirror.learningStyle.doing",
  talking: "mirror.learningStyle.talking",
  visual: "mirror.learningStyle.visual",
  mixed_learn: "mirror.learningStyle.mixed",
};

/** Map drains + obstacles → risk labels. */
function getRisks(answers: ClarityAnswers): string[] {
  const risks: string[] = [];
  const q3 = answers["q3_drains"];
  const q9 = answers["q9_obstacles"];
  if (q3 === "routine") risks.push("Boredom with repetition");
  if (q3 === "unclear_goals") risks.push("Need clear goals");
  if (q3 === "too_social") risks.push("Distraction in groups");
  if (q3 === "too_alone") risks.push("Isolation when solo");
  if (q3 === "exams") risks.push("Exam stress");
  if (q9 === "time") risks.push("Time management");
  if (q9 === "motivation") risks.push("Keeping motivation");
  if (q9 === "stress") risks.push("Stress buildup");
  if (q9 === "uncertainty") risks.push("Uncertainty about future");
  return risks.length ? risks : ["General balance"];
}

/** Build mirror from answers only — no AI. */
export function getMirror(answers: ClarityAnswers): MirrorResult {
  const q1 = answers["q1_interests"];
  const q2 = answers["q2_learn"];
  const interestsCluster =
    (typeof q1 === "string" && INTEREST_CLUSTER[q1]) || INTEREST_CLUSTER.mixed;
  const strengths =
    (typeof q2 === "string" && LEARN_TO_STRENGTHS[q2]) || LEARN_TO_STRENGTHS.mixed_learn;
  const learningStyle =
    (typeof q2 === "string" && LEARN_TO_STYLE_KEY[q2]) || "mirror.learningStyle.mixed";
  const risks = getRisks(answers);

  return {
    interestsCluster,
    strengths,
    learningStyle,
    risks,
  };
}
