"use client";

// Orchestrates a full quiz: start session -> questions -> summary.
// The active quiz is saved locally, so navigating to the dashboard
// and back (or refreshing) resumes the same session and question.

import { useCallback, useEffect, useRef, useState } from "react";
import { QUESTIONS_PER_ATTEMPT, QUIZ_QUESTIONS } from "@/lib/quizData";
import { saveGame, loadGame, clearGame, clearRoundKeys } from "@/lib/gameStore";
import GameBoard from "./GameBoard";
import HowToPlay from "./HowToPlay";
import RoundResultView, { type RoundOutcome } from "./RoundResultView";
import Summary from "./Summary";

type Phase = "starting" | "howto" | "playing" | "result" | "summary" | "error";

function shuffle<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function pickQuestionIds(): string[] {
  return shuffle(QUIZ_QUESTIONS).slice(0, QUESTIONS_PER_ATTEMPT).map((q) => q.id);
}

export default function GameClient({ playerName }: { playerName: string }) {
  const [phase, setPhase] = useState<Phase>("starting");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [roundIndex, setRoundIndex] = useState(0);
  const [questionIds, setQuestionIds] = useState<string[]>([]);
  const [outcome, setOutcome] = useState<RoundOutcome | null>(null);
  const [roundScores, setRoundScores] = useState<number[]>([]);
  const [totals, setTotals] = useState<{ totalScore: number; totalTimeSeconds: number } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const startedRef = useRef(false);

  const totalRounds = questionIds.length || QUESTIONS_PER_ATTEMPT;
  const question = QUIZ_QUESTIONS.find((q) => q.id === questionIds[roundIndex]);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const saved = loadGame();
    if (saved && saved.roundIndex < saved.questionIds.length) {
      setSessionId(saved.sessionId);
      setRoundIndex(saved.roundIndex);
      setQuestionIds(saved.questionIds);
      setRoundScores(saved.roundScores ?? []);
      setPhase("playing");
      return;
    }

    (async () => {
      try {
        const res = await fetch("/api/session/start", { method: "POST" });
        if (!res.ok) throw new Error("Could not start quiz");
        const data = await res.json();
        const nextQuestionIds = pickQuestionIds();
        setSessionId(data.sessionId);
        setQuestionIds(nextQuestionIds);
        saveGame({
          sessionId: data.sessionId,
          roundIndex: 0,
          questionIds: nextQuestionIds,
          roundScores: [],
        });
        setPhase("howto");
      } catch {
        setErrorMsg("Could not start the quiz. Is the database reachable?");
        setPhase("error");
      }
    })();
  }, []);

  const handleSubmit = useCallback(
    async (selectedOptionId: string, timeSeconds: number) => {
      if (!sessionId || !question) return;
      try {
        const res = await fetch("/api/round/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            questionId: question.id,
            selectedOptionId,
            timeSeconds,
          }),
        });
        if (!res.ok) {
          clearGame();
          throw new Error("submit failed");
        }
        const data = await res.json();
        setOutcome({ ...data, selectedOptionId, timeSeconds, question });
        const newScores = [...roundScores, data.score];
        setRoundScores(newScores);
        clearRoundKeys(sessionId, question.id);
        saveGame({
          sessionId,
          roundIndex: roundIndex + 1,
          questionIds,
          roundScores: newScores,
        });
        setPhase("result");
      } catch {
        setErrorMsg("Could not submit the answer. Go back home and press Play to restart.");
        setPhase("error");
      }
    },
    [sessionId, question, questionIds, roundIndex, roundScores]
  );

  const handleNext = useCallback(async () => {
    const next = roundIndex + 1;
    if (next < questionIds.length) {
      setRoundIndex(next);
      setOutcome(null);
      setPhase("playing");
    } else {
      try {
        const res = await fetch("/api/session/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        if (!res.ok) throw new Error("complete failed");
        setTotals(await res.json());
        clearGame();
        setPhase("summary");
      } catch {
        setErrorMsg("Could not save your quiz. Check your connection.");
        setPhase("error");
      }
    }
  }, [questionIds.length, roundIndex, sessionId]);

  if (phase === "starting") {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="animate-pulse text-lg font-semibold text-leaf-700">
          Setting up your quiz...
        </p>
      </main>
    );
  }

  if (phase === "howto") {
    return <HowToPlay onStart={() => setPhase("playing")} />;
  }

  if (phase === "error" || !question) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
        <p className="max-w-md text-center text-lg font-semibold text-red-700">{errorMsg}</p>
        <a href="/" className="rounded-xl bg-leaf-600 px-6 py-2 font-bold text-white">
          Back home
        </a>
      </main>
    );
  }

  if (phase === "summary" && totals) {
    return <Summary playerName={playerName} totals={totals} roundScores={roundScores} />;
  }

  if (phase === "result" && outcome) {
    return (
      <RoundResultView
        outcome={outcome}
        roundIndex={roundIndex}
        totalRounds={totalRounds}
        onNext={handleNext}
      />
    );
  }

  return (
    <GameBoard
      key={`${sessionId}-${question.id}`}
      sessionId={sessionId ?? ""}
      question={question}
      roundIndex={roundIndex}
      totalRounds={totalRounds}
      onSubmit={handleSubmit}
    />
  );
}
