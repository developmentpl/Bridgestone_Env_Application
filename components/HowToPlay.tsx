"use client";

import Link from "next/link";
import { POINTS_PER_QUESTION, QUESTIONS_PER_ATTEMPT, TOTAL_QUESTIONS } from "@/lib/quizData";

export default function HowToPlay({ onStart }: { onStart?: () => void }) {
  const standalone = !onStart;
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center px-4 py-8 ${
        standalone ? "bg-gradient-to-b from-[#f3faf3] to-[#e3f0e0]" : ""
      }`}
    >
      <div className="mx-auto w-full max-w-xl">
        <div className="w-full rounded-3xl bg-white/90 p-6 shadow-card backdrop-blur animate-pop sm:p-8">
          <h1 className="text-center text-2xl font-extrabold text-leaf-900">
            How to play
          </h1>

          <div className="mt-5 overflow-hidden rounded-3xl bg-leaf-100/90 ring-4 ring-leaf-200">
            <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-violet-700 px-5 py-4 text-white">
              <div className="text-xs font-black uppercase tracking-wide text-amber-300">
                Sample question
              </div>
              <p className="mt-2 text-lg font-extrabold">
                Which action supports workplace safety?
              </p>
            </div>
            <div className="grid gap-2 p-4">
              {["Ignoring a spill", "Using the correct PPE", "Blocking emergency exits"].map(
                (text, index) => (
                  <div
                    key={text}
                    className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-3 ${
                      index === 1
                        ? "border-amber-500 bg-amber-50 shadow-card"
                        : "border-leaf-100 bg-white"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-black ${
                        index === 1
                          ? "border-amber-500 bg-amber-500 text-white"
                          : "border-leaf-300 bg-leaf-50 text-leaf-700"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-sm font-bold text-leaf-950">{text}</span>
                  </div>
                )
              )}
            </div>
          </div>

          <ol className="mt-6 flex flex-col gap-3 text-sm text-leaf-900">
            <li className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-leaf-600 text-xs font-black text-white">1</span>
              <span>
                Log in with your name and phone number, then choose <b>Play</b>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-leaf-600 text-xs font-black text-white">2</span>
              <span>
                Answer {QUESTIONS_PER_ATTEMPT} randomly selected questions from a bank of {TOTAL_QUESTIONS}.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-leaf-600 text-xs font-black text-white">3</span>
              <span>
                Each correct answer gives <b>{POINTS_PER_QUESTION} points</b>. Your
                total time is also recorded.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-leaf-600 text-xs font-black text-white">4</span>
              <span>
                The leaderboard ranks by highest score first, then lowest time.
              </span>
            </li>
          </ol>

          {onStart ? (
            <>
              <button
                onClick={onStart}
                className="mt-6 w-full rounded-2xl border-4 border-white bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-4 text-lg font-extrabold uppercase tracking-wide text-white shadow-2xl transition hover:from-amber-600 hover:to-orange-700 active:scale-[0.98]"
              >
                Let&apos;s proceed
              </button>
              <p className="mt-2 text-center text-xs text-leaf-700/70">
                The timer starts when the first question appears.
              </p>
            </>
          ) : (
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/play"
                className="rounded-2xl border-4 border-white bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 text-center text-lg font-extrabold text-white shadow-2xl transition hover:from-amber-600 hover:to-orange-700 active:scale-95"
              >
                Let&apos;s play
              </Link>
              <Link
                href="/"
                className="rounded-2xl border-2 border-leaf-600 bg-white px-6 py-3 text-center text-lg font-bold text-leaf-700 transition hover:bg-leaf-50 active:scale-95"
              >
                Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
