"use client";

import type { QuizQuestion } from "@/lib/quizData";

export type RoundOutcome = {
  score: number;
  isCorrect: boolean;
  correctOptionId: string;
  correctAnswer: string;
  selectedOptionId: string;
  timeSeconds: number;
  question: QuizQuestion;
};

export default function RoundResultView({
  outcome,
  roundIndex,
  totalRounds,
  onNext,
}: {
  outcome: RoundOutcome;
  roundIndex: number;
  totalRounds: number;
  onNext: () => void;
}) {
  const isLast = roundIndex + 1 >= totalRounds;
  const selected = outcome.question.options.find((o) => o.id === outcome.selectedOptionId);

  return (
    <main className="mx-auto max-w-2xl px-3 py-6 sm:px-4">
      <section className="overflow-hidden rounded-3xl bg-white/90 shadow-card backdrop-blur animate-pop">
        <div
          className={`px-6 py-6 text-center text-white ${
            outcome.isCorrect
              ? "bg-gradient-to-r from-leaf-600 to-teal-600"
              : "bg-gradient-to-r from-rose-600 to-orange-600"
          }`}
        >
          <div className="text-xs font-black uppercase tracking-wide text-white/80">
            Question {roundIndex + 1} of {totalRounds}
          </div>
          <h2 className="mt-2 text-3xl font-extrabold">
            {outcome.isCorrect ? "Correct answer" : "Good try"}
          </h2>
          <p className="mt-1 text-sm font-semibold text-white/85">
            {outcome.score} points · {outcome.timeSeconds}s
          </p>
        </div>

        <div className="p-5 sm:p-6">
          <p className="text-base font-extrabold leading-snug text-leaf-950">
            {outcome.question.question}
          </p>

          <div className="mt-5 grid gap-3">
            <div className="rounded-2xl border-2 border-leaf-200 bg-leaf-50 p-4">
              <div className="text-xs font-black uppercase tracking-wide text-leaf-700">
                Correct answer
              </div>
              <p className="mt-1 font-bold text-leaf-950">
                {outcome.correctOptionId}. {outcome.correctAnswer}
              </p>
            </div>

            {!outcome.isCorrect && selected && (
              <div className="rounded-2xl border-2 border-rose-200 bg-rose-50 p-4">
                <div className="text-xs font-black uppercase tracking-wide text-rose-700">
                  Your answer
                </div>
                <p className="mt-1 font-bold text-rose-950">
                  {selected.id}. {selected.text}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <button
        onClick={onNext}
        className="mt-6 w-full rounded-2xl border-4 border-white bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-4 text-lg font-extrabold uppercase tracking-wide text-white shadow-2xl transition hover:from-amber-600 hover:to-orange-700 active:scale-[0.98]"
      >
        {isLast ? "Finish quiz" : "Next question"}
      </button>
    </main>
  );
}
