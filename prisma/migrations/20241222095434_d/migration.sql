-- DropForeignKey
ALTER TABLE "UsersLanguage" DROP CONSTRAINT "UsersLanguage_user_id_fkey";

-- AddForeignKey
ALTER TABLE "UsersLanguage" ADD CONSTRAINT "UsersLanguage_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
