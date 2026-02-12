import type { ClarityAnswers, DirectionId, DirectionOption } from "./types";
import { DIRECTION_IDS } from "./types";

/** Labels for directions (i18n: clarity.directions[id].label / .desc). */
export const DIRECTION_LABELS: Record<DirectionId, { labelKey: string; descriptionKey: string }> = {
  sciences: { labelKey: "sciences", descriptionKey: "sciences" },
  humanities: { labelKey: "humanities", descriptionKey: "humanities" },
  arts: { labelKey: "arts", descriptionKey: "arts" },
  tech: { labelKey: "tech", descriptionKey: "tech" },
  mixed: { labelKey: "mixed", descriptionKey: "mixed" },
};

/** Map interests + situations to 3–5 direction IDs. Transparent logic, no AI. */
function mapAnswersToDirectionIds(answers: ClarityAnswers): DirectionId[] {
  const q1 = answers["q1_interests"];
  const q5 = answers["q5_situations"];
  const q8 = answers["q8_goals"];

  const base: DirectionId[] = [];
  if (q1 === "sciences") base.push("sciences");
  else if (q1 === "humanities") base.push("humanities");
  else if (q1 === "arts") base.push("arts");
  else if (q1 === "tech") base.push("tech");
  else base.push("sciences", "humanities", "mixed");

  if (q1 === "mixed") {
    base.length = 0;
    base.push("sciences", "humanities", "arts", "tech", "mixed");
  }

  if (typeof q5 === "string") {
    if (q5 === "analytical" && !base.includes("sciences")) base.push("sciences");
    if (q5 === "creative" && !base.includes("arts")) base.push("arts");
    if (q5 === "helping" && !base.includes("humanities")) base.push("humanities");
  }

  if (typeof q8 === "string" && q8 === "explore" && !base.includes("mixed")) base.push("mixed");

  const unique = [...new Set(base)];
  return unique.slice(0, 5);
}

export function getDirectionIds(answers: ClarityAnswers): DirectionId[] {
  const ids = mapAnswersToDirectionIds(answers);
  return ids.length >= 3 ? ids : [DIRECTION_IDS[0], DIRECTION_IDS[1], DIRECTION_IDS[4]];
}

export function getDirectionOptions(answers: ClarityAnswers): DirectionOption[] {
  const ids = getDirectionIds(answers);
  return ids.map((id) => ({
    id,
    labelKey: DIRECTION_LABELS[id].labelKey,
    descriptionKey: DIRECTION_LABELS[id].descriptionKey,
  }));
}
