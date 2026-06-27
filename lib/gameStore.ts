// Client-side persistence of the active quiz, so players can visit the
// dashboard (or accidentally refresh) and return to their question.

export type SavedGame = {
  sessionId: string;
  roundIndex: number; // the question the player should be playing
  questionIds: string[];
  roundScores: number[];
};

const KEY = "esg_active_quiz";

export function saveGame(g: SavedGame) {
  try {
    localStorage.setItem(KEY, JSON.stringify(g));
  } catch {}
}

export function loadGame(): SavedGame | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const g = JSON.parse(raw);
    if (
      typeof g?.sessionId !== "string" ||
      typeof g?.roundIndex !== "number" ||
      !Array.isArray(g?.questionIds)
    ) {
      return null;
    }
    return g;
  } catch {
    return null;
  }
}

export function clearGame() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}

export function orderKey(sessionId: string, itemKey: string) {
  return `esg_answer_${sessionId}_${itemKey}`;
}

export function timerKey(sessionId: string, itemKey: string) {
  return `esg_tstart_${sessionId}_${itemKey}`;
}

export function clearRoundKeys(sessionId: string, itemKey: string) {
  try {
    localStorage.removeItem(orderKey(sessionId, itemKey));
    localStorage.removeItem(timerKey(sessionId, itemKey));
  } catch {}
}
