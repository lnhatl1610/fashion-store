BEGIN;

UPDATE "users"
SET "status" = 'BANNED'
WHERE "isActive" = false OR "status" = 'INACTIVE';

CREATE TYPE "UserStatus_new" AS ENUM ('ACTIVE', 'BANNED');

ALTER TABLE "users" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "users"
  ALTER COLUMN "status" TYPE "UserStatus_new"
  USING ("status"::text::"UserStatus_new");
ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
ALTER TABLE "users" DROP COLUMN "isActive";

ALTER TYPE "UserStatus" RENAME TO "UserStatus_old";
ALTER TYPE "UserStatus_new" RENAME TO "UserStatus";
DROP TYPE "UserStatus_old";

COMMIT;
