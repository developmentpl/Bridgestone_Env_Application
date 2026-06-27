# Bridgestone India ESG Quiz

Timed multiple-choice quiz app built from the provided Excel question bank.
Players log in with name + phone, answer 10 randomly selected MCQs from a
50-question bank, and are ranked on the leaderboard by highest score first and
lowest completion time second.

## Tech

Next.js 15 App Router, TypeScript, Tailwind CSS, Prisma, PostgreSQL, and a
simple demo cookie login.

## Database

Copy `.env.example` to `.env` and set:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/dbname?sslmode=require"
```

Neon Postgres works well for local/demo testing.

## Run

```bash
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Open `http://localhost:3000`.

## Main Files

| What | Where |
|---|---|
| Quiz questions imported from Excel | `lib/quizData.ts` |
| Login/session cookie | `lib/session.ts`, `app/api/login/route.ts` |
| Quiz screen | `components/GameBoard.tsx` |
| Quiz flow orchestration | `components/GameClient.tsx` |
| Server-side answer scoring | `app/api/round/submit/route.ts` |
| Leaderboard query | `lib/leaderboard.ts` |
| Prisma schema, migrations, seed | `prisma/` |

## Scoring

Each quiz attempt has 10 questions. Each correct answer gives 10 points, so the
final result is out of 100. Final leaderboard ranking is:

1. Higher total score
2. Lower total quiz time

The ESG Pillar column from the Excel file is intentionally ignored.
