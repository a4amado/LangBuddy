-- DropForeignKey
ALTER TABLE "ChatMember" DROP CONSTRAINT "ChatMember_user_id_fkey";

-- AddForeignKey
ALTER TABLE "ChatMember" ADD CONSTRAINT "ChatMember_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
