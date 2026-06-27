import { NextResponse } from "next/server";
import { getLeaderboard } from "@/lib/leaderboard";

export async function GET() {
  const rows = await getLeaderboard();
  return NextResponse.json({ rows });
}
