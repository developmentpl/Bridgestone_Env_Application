-- Login is now name + phone only; phone becomes the player's unique identity.

-- Backfill empty phones from the old employee ID
UPDATE "User" SET "phone" = "employeeId" WHERE "phone" IS NULL OR "phone" = '';

-- De-duplicate any repeated phone numbers (test data) before adding the unique index
WITH d AS (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY "phone" ORDER BY "createdAt") AS rn
  FROM "User"
)
UPDATE "User" SET "phone" = "User"."phone" || '-' || "User"."id"
FROM d
WHERE d.id = "User".id AND d.rn > 1;

ALTER TABLE "User" DROP COLUMN "employeeId";

CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
