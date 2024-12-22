-- DropForeignKey
ALTER TABLE "ChatMessege" DROP CONSTRAINT "ChatMessege_chat_id_fkey";

-- DropForeignKey
ALTER TABLE "ChatMessege" DROP CONSTRAINT "ChatMessege_sender_id_fkey";

-- AlterTable
ALTER TABLE "ChatMessege" ALTER COLUMN "sender_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ChatMessege" ADD CONSTRAINT "ChatMessege_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessege" ADD CONSTRAINT "ChatMessege_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
