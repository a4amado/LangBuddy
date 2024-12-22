-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_last_messege_id_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_last_messege_id_fkey" FOREIGN KEY ("last_messege_id") REFERENCES "ChatMessege"("id") ON DELETE CASCADE ON UPDATE CASCADE;
