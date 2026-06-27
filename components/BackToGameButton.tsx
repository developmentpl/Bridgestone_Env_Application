"use client";

// Shows "Back to quiz" on the dashboard while a quiz is in progress.

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadGame } from "@/lib/gameStore";

export default function BackToGameButton() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const g = loadGame();
    setActive(!!g && g.roundIndex < g.questionIds.length);
  }, []);

  if (!active) {
    return (
      <Link
        href="/play"
        className="rounded-2xl bg-leaf-600 px-6 py-3 font-bold text-white shadow-card transition hover:bg-leaf-700"
      >
        Play
      </Link>
    );
  }

  return (
    <Link
      href="/play"
      className="animate-pulse rounded-2xl border-4 border-white bg-gradient-to-r from-amber-500 to-orange-600 px-6 py-3 font-extrabold text-white shadow-2xl transition hover:from-amber-600 hover:to-orange-700"
    >
      Back to quiz
    </Link>
  );
}
