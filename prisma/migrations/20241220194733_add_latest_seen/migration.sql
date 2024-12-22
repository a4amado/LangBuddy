/*
  Warnings:

  - You are about to drop the column `latest_ip` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "latest_ip",
ADD COLUMN     "latestSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
