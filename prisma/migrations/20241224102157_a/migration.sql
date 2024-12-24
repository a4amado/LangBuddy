-- DropIndex
DROP INDEX "ChatMember_chatId_userId_key";

-- AlterTable
ALTER TABLE "ChatMember" ADD CONSTRAINT "ChatMember_pkey" PRIMARY KEY ("chatId", "userId");
