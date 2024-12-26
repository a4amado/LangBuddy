/*
  Warnings:

  - You are about to drop the column `images` on the `User` table. All the data in the column will be lost.
  - The primary key for the `_ChatToUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[A,B]` on the table `_ChatToUser` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "images" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "images";

-- AlterTable
ALTER TABLE "_ChatToUser" DROP CONSTRAINT "_ChatToUser_AB_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "_ChatToUser_AB_unique" ON "_ChatToUser"("A", "B");
