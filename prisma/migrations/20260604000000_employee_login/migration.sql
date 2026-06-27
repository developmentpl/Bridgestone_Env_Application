-- Switch login from name+email to name + employeeId + phone

ALTER TABLE "User" ADD COLUMN "employeeId" TEXT;
ALTER TABLE "User" ADD COLUMN "phone" TEXT;

-- Backfill any existing rows (test data): use email (or id) as a placeholder employeeId
UPDATE "User" SET "employeeId" = 'ECO-001' WHERE "email" = 'eco.bot@example.com' AND "employeeId" IS NULL;
UPDATE "User" SET "employeeId" = COALESCE("email", "id") WHERE "employeeId" IS NULL;
UPDATE "User" SET "phone" = '' WHERE "phone" IS NULL;

ALTER TABLE "User" ALTER COLUMN "employeeId" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "phone" SET NOT NULL;

CREATE UNIQUE INDEX "User_employeeId_key" ON "User"("employeeId");

DROP INDEX IF EXISTS "User_email_key";
ALTER TABLE "User" DROP COLUMN IF EXISTS "email";
ALTER TABLE "User" DROP COLUMN IF EXISTS "image";
