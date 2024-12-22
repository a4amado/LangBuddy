-- CreateEnum
CREATE TYPE "ChatType" AS ENUM ('CHAT', 'GROUP');

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "type" "ChatType" NOT NULL DEFAULT 'CHAT';
