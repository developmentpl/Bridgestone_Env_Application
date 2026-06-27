import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { getQuestion, POINTS_PER_QUESTION } from "@/lib/quizData";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const sessionId = String(body?.sessionId ?? "");
  const questionId = String(body?.questionId ?? "");
  const selectedOptionId = String(body?.selectedOptionId ?? "").toUpperCase();
  const timeSeconds = Math.max(0, Math.floor(Number(body?.timeSeconds ?? 0)));

  const question = getQuestion(questionId);
  if (!question) return NextResponse.json({ error: "Unknown question" }, { status: 400 });
  if (!["A", "B", "C", "D"].includes(selectedOptionId)) {
    return NextResponse.json({ error: "Invalid answer" }, { status: 400 });
  }

  const session = await prisma.gameSession.findUnique({ where: { id: sessionId } });
  if (!session || session.userId !== user.id || session.status !== "in_progress") {
    return NextResponse.json({ error: "Invalid session" }, { status: 400 });
  }

  const dupe = await prisma.roundResult.findFirst({
    where: { sessionId, itemKey: questionId },
  });
  if (dupe) return NextResponse.json({ error: "Question already answered" }, { status: 400 });

  const isCorrect = selectedOptionId === question.correctOptionId;
  const score = isCorrect ? POINTS_PER_QUESTION : 0;

  await prisma.roundResult.create({
    data: {
      sessionId,
      itemKey: questionId,
      correctPositions: isCorrect ? 1 : 0,
      totalCards: 1,
      score,
      timeSeconds,
      submittedOrder: [selectedOptionId],
    },
  });

  return NextResponse.json({
    score,
    isCorrect,
    correctOptionId: question.correctOptionId,
    correctAnswer: question.options.find((o) => o.id === question.correctOptionId)?.text ?? "",
  });
}
