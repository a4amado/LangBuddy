/*
  Warnings:

  - You are about to drop the column `imgs` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "imgs",
ADD COLUMN     "images" TEXT;
