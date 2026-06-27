import type { LeaderboardRow } from "@/lib/leaderboard";

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  return `${m}m ${s % 60}s`;
}

function starsFor(rank: number) {
  return Math.max(1, 6 - rank);
}

const MEDAL: Record<number, string> = {
  1: "bg-gradient-to-b from-yellow-300 to-yellow-500 text-yellow-900 border-yellow-200",
  2: "bg-gradient-to-b from-gray-200 to-gray-400 text-gray-800 border-gray-100",
  3: "bg-gradient-to-b from-orange-300 to-orange-500 text-orange-900 border-orange-200",
};

export default function LeaderboardTable({
  rows,
  currentUserId,
}: {
  rows: LeaderboardRow[];
  currentUserId: string | null;
}) {
  if (rows.length === 0) {
    return (
      <p className="rounded-2xl bg-white/80 p-8 text-center text-leaf-700 shadow-card">
        No quiz attempts yet. Be the first!
      </p>
    );
  }

  return (
    <ol className="flex flex-col gap-2.5">
      {rows.map((row) => {
        const isMe = row.userId === currentUserId;
        const filled = starsFor(row.rank);
        const medal =
          MEDAL[row.rank] ??
          "bg-gradient-to-b from-indigo-300 to-indigo-500 text-white border-indigo-200";
        return (
          <li
            key={row.userId}
            className={`relative flex items-stretch drop-shadow-md ${
              isMe ? "scale-[1.02]" : ""
            }`}
          >
            <div
              className={`flex min-w-0 flex-1 items-center gap-2.5 rounded-l-xl bg-gradient-to-r py-2 pl-2 pr-7 sm:gap-3 ${
                isMe
                  ? "from-amber-600 via-orange-600 to-orange-500"
                  : "from-indigo-900 via-indigo-800 to-violet-700"
              }`}
              style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%)" }}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-white/60 bg-white/15 text-sm font-black text-white">
                {row.name.trim().charAt(0).toUpperCase() || "?"}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-extrabold uppercase tracking-wide text-white sm:text-base">
                    {row.name}
                  </span>
                  {isMe && (
                    <span className="shrink-0 rounded-full bg-white px-1.5 py-0.5 text-[9px] font-black text-orange-700">
                      YOU
                    </span>
                  )}
                </div>
                <div className="text-[10px] tracking-widest">
                  <span className="text-yellow-400">{"*".repeat(filled)}</span>
                  <span className="text-white/25">{"*".repeat(5 - filled)}</span>
                </div>
              </div>

              <span
                className={`mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-black shadow ${medal}`}
              >
                {row.rank}
              </span>
            </div>

            <div
              className={`-ml-3 flex w-[88px] shrink-0 flex-col items-end justify-center rounded-r-xl py-1 pl-5 pr-3 sm:w-[104px] ${
                isMe ? "bg-amber-100" : "bg-white"
              }`}
              style={{ clipPath: "polygon(16px 0, 100% 0, 100% 100%, 0 100%)" }}
            >
              <span className="text-lg font-black leading-none text-indigo-950 sm:text-xl">
                {row.bestScore}
              </span>
              <span className="text-[10px] font-semibold text-indigo-950/50">
                {formatTime(row.totalTimeSeconds)}
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
