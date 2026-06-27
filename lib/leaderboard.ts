import { prisma } from "./prisma";

export type LeaderboardRow = {
  rank: number;
  userId: string;
  name: string;
  bestScore: number;
  totalTimeSeconds: number;
  playedAt: string;
};

// Best session per player, ranked by score desc, then time asc as tiebreaker.
export async function getLeaderboard(): Promise<LeaderboardRow[]> {
  const sessions = await prisma.gameSession.findMany({
    where: { status: "completed" },
    include: { user: { select: { id: true, name: true } } },
    orderBy: [{ totalScore: "desc" }, { totalTimeSeconds: "asc" }],
  });

  const bestByUser = new Map<string, (typeof sessions)[number]>();
  for (const s of sessions) {
    const prev = bestByUser.get(s.userId);
    if (
      !prev ||
      s.totalScore > prev.totalScore ||
      (s.totalScore === prev.totalScore && s.totalTimeSeconds < prev.totalTimeSeconds)
    ) {
      bestByUser.set(s.userId, s);
    }
  }

  return [...bestByUser.values()]
    .sort(
      (a, b) =>
        b.totalScore - a.totalScore || a.totalTimeSeconds - b.totalTimeSeconds
    )
    .map((s, i) => ({
      rank: i + 1,
      userId: s.userId,
      name: s.user.name,
      bestScore: s.totalScore,
      totalTimeSeconds: s.totalTimeSeconds,
      playedAt: (s.completedAt ?? s.startedAt).toISOString(),
    }));
}
