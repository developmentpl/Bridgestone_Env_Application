"use client";

import Link from "next/link";
import { POINTS_PER_QUESTION, QUESTIONS_PER_ATTEMPT } from "@/lib/quizData";

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  return `${m}m ${s % 60}s`;
}

export default function Summary({
  playerName,
  totals,
  roundScores,
}: {
  playerName: string;
  totals: { totalScore: number; totalTimeSeconds: number };
  roundScores: number[];
}) {
  const correct = roundScores.filter((s) => s > 0).length;
  const maxScore = QUESTIONS_PER_ATTEMPT * POINTS_PER_QUESTION;

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-6 px-4 py-10">
      <div className="w-full rounded-3xl bg-white/85 p-8 text-center shadow-card backdrop-blur animate-pop">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-600 text-2xl font-black text-white shadow-card">
          {correct}
        </div>
        <h1 className="mt-4 text-3xl font-extrabold text-leaf-900">
          Quiz complete, {playerName}!
        </h1>
        <p className="mt-1 text-sm text-leaf-700/80">
          Your result is saved to the leaderboard.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-leaf-50 p-4">
            <div className="text-xs font-semibold uppercase text-leaf-600">
              Total score
            </div>
            <div className="text-3xl font-extrabold text-leaf-700">
              {totals.totalScore}/{maxScore}
            </div>
          </div>
          <div className="rounded-2xl bg-earth-50 p-4">
            <div className="text-xs font-semibold uppercase text-earth-700">
              Total time
            </div>
            <div className="text-3xl font-extrabold text-earth-800">
              {formatTime(totals.totalTimeSeconds)}
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 text-left shadow-card">
          <div className="flex justify-between text-sm">
            <span className="font-bold text-leaf-800">Correct answers</span>
            <span className="font-black text-leaf-950">
              {correct} of {QUESTIONS_PER_ATTEMPT}
            </span>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-leaf-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-leaf-500 to-amber-500"
              style={{ width: `${Math.round((correct / QUESTIONS_PER_ATTEMPT) * 100)}%` }}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/leaderboard"
            className="rounded-2xl border-4 border-white bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 font-extrabold text-white shadow-2xl transition hover:from-amber-600 hover:to-orange-700 active:scale-95"
          >
            View leaderboard
          </Link>
          <Link
            href="/play"
            className="rounded-2xl border-2 border-leaf-600 bg-white/80 px-6 py-3 font-bold text-leaf-700 transition hover:bg-leaf-50 active:scale-95"
          >
            Play again
          </Link>
        </div>
      </div>
    </main>
  );
}
