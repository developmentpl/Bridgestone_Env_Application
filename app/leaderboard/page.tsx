import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import { getLeaderboard } from "@/lib/leaderboard";
import LeaderboardTable from "@/components/LeaderboardTable";
import BackToGameButton from "@/components/BackToGameButton";

export const dynamic = "force-dynamic";

export default async function LeaderboardPage() {
  const [user, rows] = await Promise.all([getCurrentUser(), getLeaderboard()]);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <header className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-600 text-xl font-black text-white shadow-card">
          #
        </div>
        <h1 className="mt-3 text-3xl font-extrabold text-leaf-900">Leaderboard</h1>
        <p className="text-sm text-leaf-700/80">
          Ranked by highest score first, then lowest completion time.
        </p>
      </header>

      <div className="mt-6">
        <LeaderboardTable rows={rows} currentUserId={user?.id ?? null} />
      </div>

      <div className="mt-8 flex justify-center gap-3">
        <Link
          href="/"
          className="rounded-2xl border-2 border-leaf-600 px-6 py-3 font-bold text-leaf-700 transition hover:bg-leaf-50"
        >
          Home
        </Link>
        {user && <BackToGameButton />}
      </div>
    </main>
  );
}
