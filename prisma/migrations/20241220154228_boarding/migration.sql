/*
  Warnings:

  - You are about to drop the column `level` on the `UsersLanguage` table. All the data in the column will be lost.
  - Changed the type of `language` on the `UsersLanguage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "boarded" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "UsersLanguage" DROP COLUMN "level",
DROP COLUMN "language",
ADD COLUMN     "language" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Language";

-- DropEnum
DROP TYPE "Level";

-- CreateTable
CREATE TABLE "Profile" (
    "user_id" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "hobbies" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
