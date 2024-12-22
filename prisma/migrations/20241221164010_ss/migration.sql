-- AlterTable
ALTER TABLE "User" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "blocked" (
    "user_1_id" TEXT NOT NULL,
    "user_2_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "AuthSession" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "active_expires" BIGINT NOT NULL,
    "idle_expires" BIGINT NOT NULL,

    CONSTRAINT "AuthSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthKey" (
    "id" TEXT NOT NULL,
    "hashed_password" TEXT,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "AuthKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blocked_user_1_id_user_2_id_key" ON "blocked"("user_1_id", "user_2_id");

-- CreateIndex
CREATE UNIQUE INDEX "AuthSession_id_key" ON "AuthSession"("id");

-- CreateIndex
CREATE INDEX "AuthSession_user_id_idx" ON "AuthSession"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "AuthKey_id_key" ON "AuthKey"("id");

-- CreateIndex
CREATE INDEX "AuthKey_user_id_idx" ON "AuthKey"("user_id");

-- AddForeignKey
ALTER TABLE "AuthSession" ADD CONSTRAINT "AuthSession_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthKey" ADD CONSTRAINT "AuthKey_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
