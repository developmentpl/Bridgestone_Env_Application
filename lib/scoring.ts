// All scoring constants live here so they're easy to tweak.

export const SCORING = {
  BASE_MAX: 100, // base = round((correct / total) * BASE_MAX)
  PERFECT_BONUS: 20, // added when every card is in the right place
  SPEED_BONUS_MAX: 30, // speed bonus cap
  SPEED_DIVISOR: 2, // bonus = max(0, SPEED_BONUS_MAX - floor(seconds / SPEED_DIVISOR))
} as const;

export function computeRoundScore(params: {
  correctPositions: number;
  totalCards: number;
  timeSeconds: number;
}): { base: number; perfectBonus: number; speedBonus: number; score: number } {
  const { correctPositions, totalCards, timeSeconds } = params;
  const base = Math.round((correctPositions / totalCards) * SCORING.BASE_MAX);
  const perfectBonus = correctPositions === totalCards ? SCORING.PERFECT_BONUS : 0;
  const speedBonus = Math.max(
    0,
    SCORING.SPEED_BONUS_MAX - Math.floor(timeSeconds / SCORING.SPEED_DIVISOR)
  );
  return { base, perfectBonus, speedBonus, score: base + perfectBonus + speedBonus };
}

export function countCorrectPositions(submitted: string[], correct: string[]): number {
  let c = 0;
  for (let i = 0; i < correct.length; i++) {
    if (submitted[i] === correct[i]) c++;
  }
  return c;
}

export function computeQuestionScore(isCorrect: boolean): number {
  return isCorrect ? 10 : 0;
}
