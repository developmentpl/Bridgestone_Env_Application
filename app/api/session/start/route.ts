import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export async function POST() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const session = await prisma.gameSession.create({
    data: { userId: user.id },
  });

  return NextResponse.json({ sessionId: session.id });
}
