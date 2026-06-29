import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { QUESTIONS_PER_ATTEMPT } from "@/lib/quizData";
import LogoutButton from "@/components/LogoutButton";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <main className="bg-home flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center gap-8 px-4 py-10">
        <div className="text-center animate-float">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/backgrounds/Bridgestone_logo_Original.png"
            alt="Bridgestone"
            className="mx-auto h-11 w-auto max-w-[180px] object-contain"
          />
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-leaf-800 sm:text-4xl">
            Bridgestone ESG Quiz
          </h1>
          <p className="text-lg font-medium text-leaf-600">Learn. Answer. Lead.</p>
          <p className="mt-1 text-sm text-leaf-700/70">Interactive MCQ challenge</p>
        </div>

        <div className="w-full rounded-3xl bg-white/80 p-6 shadow-card backdrop-blur animate-pop">
          <p className="text-center text-leaf-900">
            Welcome, <span className="font-bold">{user.name}</span>
          </p>
          <p className="mt-2 text-center text-sm text-leaf-700/80">
            Give the answers for {QUESTIONS_PER_ATTEMPT} MCQ questions. Total
            score is out of 30; faster completion breaks ties.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/play"
              className="rounded-2xl bg-leaf-600 px-8 py-3 text-center text-lg font-bold text-white shadow-card transition hover:bg-leaf-700 active:scale-95"
            >
              Play
            </Link>
            <Link
              href="/leaderboard"
              className="rounded-2xl border-2 border-leaf-600 px-8 py-3 text-center text-lg font-bold text-leaf-700 transition hover:bg-leaf-50 active:scale-95"
            >
              Leaderboard
            </Link>
          </div>

          <div className="mt-3 flex justify-center">
            <Link
              href="/how-to-play"
              className="rounded-2xl border-4 border-white bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-3 text-center text-lg font-bold text-white shadow-2xl transition hover:from-amber-600 hover:to-orange-700 active:scale-95"
            >
              How to play
            </Link>
          </div>

          <p className="mt-4 text-center text-xs font-medium text-leaf-700/70">
            Developed by <span className="font-bold text-leaf-800">Parallel Learning</span>
          </p>
        </div>

        <LogoutButton name={user.name} />
      </div>
    </main>
  );
}
