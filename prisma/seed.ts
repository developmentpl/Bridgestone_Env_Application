import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { QUIZ_QUESTIONS, TOTAL_QUESTIONS } from "../lib/quizData";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log(`Validating quiz content: ${TOTAL_QUESTIONS} questions`);
  for (const question of QUIZ_QUESTIONS) {
    if (question.options.length !== 4) {
      throw new Error(`Question ${question.id} must have exactly 4 options`);
    }
    if (!question.options.some((option) => option.id === question.correctOptionId)) {
      throw new Error(`Question ${question.id} has an invalid correct answer`);
    }
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
