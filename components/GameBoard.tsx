"use client";

// One quiz question: timer + MCQ options + submit.

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { QuizQuestion } from "@/lib/quizData";
import { orderKey, timerKey } from "@/lib/gameStore";

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")}`;
}

function restoreAnswer(sessionId: string, question: QuizQuestion): string | null {
  try {
    return localStorage.getItem(orderKey(sessionId, question.id));
  } catch {
    return null;
  }
}

function restoreStart(sessionId: string, question: QuizQuestion): number {
  try {
    const k = timerKey(sessionId, question.id);
    const raw = localStorage.getItem(k);
    if (raw && Number.isFinite(Number(raw))) return Number(raw);
    const now = Date.now();
    localStorage.setItem(k, String(now));
    return now;
  } catch {
    return Date.now();
  }
}

export default function GameBoard({
  sessionId,
  question,
  roundIndex,
  totalRounds,
  onSubmit,
}: {
  sessionId: string;
  question: QuizQuestion;
  roundIndex: number;
  totalRounds: number;
  onSubmit: (selectedOptionId: string, timeSeconds: number) => void;
}) {
  const [selected, setSelected] = useState<string | null>(() =>
    restoreAnswer(sessionId, question)
  );
  const [startTs] = useState<number>(() => restoreStart(sessionId, question));
  const [seconds, setSeconds] = useState(() =>
    Math.max(0, Math.floor((Date.now() - startTs) / 1000))
  );
  const [submitting, setSubmitting] = useState(false);

  const progress = useMemo(
    () => Math.round(((roundIndex + 1) / totalRounds) * 100),
    [roundIndex, totalRounds]
  );

  useEffect(() => {
    const t = setInterval(
      () => setSeconds(Math.max(0, Math.floor((Date.now() - startTs) / 1000))),
      1000
    );
    return () => clearInterval(t);
  }, [startTs]);

  function choose(optionId: string) {
    setSelected(optionId);
    try {
      localStorage.setItem(orderKey(sessionId, question.id), optionId);
    } catch {}
  }

  return (
    <main className="mx-auto max-w-2xl px-3 py-4 sm:px-4 sm:py-6">
      <header className="rounded-2xl bg-white/90 px-4 py-3 shadow-card backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-leaf-600 sm:text-xs">
              Question {roundIndex + 1} of {totalRounds} · {question.level}
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-leaf-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-leaf-500 to-amber-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <Link
              href="/leaderboard"
              title="Your quiz is saved - come back any time"
              className="rounded-xl bg-leaf-600 px-2.5 py-1.5 text-sm font-bold text-white transition hover:bg-leaf-700 sm:px-3 sm:py-2"
            >
              <span className="hidden sm:inline">Dashboard</span>
              <span className="sm:hidden">Board</span>
            </Link>
            <div
              className="rounded-xl bg-leaf-100 px-2 py-1.5 font-mono text-sm font-bold text-leaf-800 sm:px-3 sm:py-2 sm:text-lg"
              aria-label="Timer"
            >
              {formatTime(seconds)}
            </div>
          </div>
        </div>
      </header>

      <section className="mt-4 overflow-hidden rounded-3xl bg-white/90 shadow-card backdrop-blur animate-pop">
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-700 px-5 py-5 text-white">
          <div className="text-xs font-black uppercase tracking-wide text-amber-300">
            Bridgestone India ESG Quiz
          </div>
          <h1 className="mt-2 text-xl font-extrabold leading-snug sm:text-2xl">
            {question.question}
          </h1>
        </div>

        <div className="grid gap-3 p-4 sm:p-5">
          {question.options.map((option) => {
            const active = selected === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => choose(option.id)}
                className={`flex min-h-[72px] items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition active:scale-[0.99] ${
                  active
                    ? "border-amber-500 bg-amber-50 shadow-card"
                    : "border-leaf-100 bg-white hover:border-leaf-300 hover:bg-leaf-50"
                }`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-black ${
                    active
                      ? "border-amber-500 bg-amber-500 text-white"
                      : "border-leaf-300 bg-leaf-50 text-leaf-700"
                  }`}
                >
                  {option.id}
                </span>
                <span className="text-sm font-bold leading-snug text-leaf-950 sm:text-base">
                  {option.text}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <button
        disabled={!selected || submitting}
        onClick={() => {
          if (!selected) return;
          setSubmitting(true);
          onSubmit(selected, Math.max(0, Math.floor((Date.now() - startTs) / 1000)));
        }}
        className="mt-5 w-full rounded-2xl border-4 border-white bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-4 text-lg font-extrabold uppercase tracking-wide text-white shadow-2xl transition hover:from-amber-600 hover:to-orange-700 active:scale-[0.98] disabled:opacity-60"
      >
        {submitting ? "Checking..." : "Submit answer"}
      </button>
    </main>
  );
}
