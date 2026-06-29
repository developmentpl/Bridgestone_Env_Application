-- Add employee ID as a required unique login field.

ALTER TABLE "User" ADD COLUMN "employeeId" TEXT;

-- Backfill existing demo/event users so the new NOT NULL + UNIQUE constraint is safe.
UPDATE "User"
SET "employeeId" = 'EMP-' || "id"
WHERE "employeeId" IS NULL;

ALTER TABLE "User" ALTER COLUMN "employeeId" SET NOT NULL;

CREATE UNIQUE INDEX "User_employeeId_key" ON "User"("employeeId");
