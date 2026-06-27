import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { QUESTIONS_PER_ATTEMPT } from "@/lib/quizData";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const sessionId = String(body?.sessionId ?? "");

  const session = await prisma.gameSession.findUnique({
    where: { id: sessionId },
    include: { rounds: true },
  });
  if (!session || session.userId !== user.id) {
    return NextResponse.json({ error: "Invalid session" }, { status: 400 });
  }
  if (session.rounds.length < QUESTIONS_PER_ATTEMPT) {
    return NextResponse.json({ error: "Quiz is not complete" }, { status: 400 });
  }

  // Totals are recomputed on the server from stored answers.
  const totalScore = session.rounds.reduce(
    (sum: number, round: { score: number }) => sum + round.score,
    0
  );
  const totalTimeSeconds = session.rounds.reduce(
    (sum: number, round: { timeSeconds: number }) => sum + round.timeSeconds,
    0
  );

  const updated = await prisma.gameSession.update({
    where: { id: sessionId },
    data: {
      status: "completed",
      totalScore,
      totalTimeSeconds,
      completedAt: new Date(),
    },
  });

  return NextResponse.json({
    totalScore: updated.totalScore,
    totalTimeSeconds: updated.totalTimeSeconds,
  });
}
