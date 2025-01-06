/*
  Warnings:

  - You are about to drop the column `usedAt` on the `Invitation` table. All the data in the column will be lost.
  - You are about to drop the column `usedBy` on the `Invitation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Invitation" DROP COLUMN "usedAt",
DROP COLUMN "usedBy",
ADD COLUMN     "lastUsedAt" TIMESTAMP(3),
ADD COLUMN     "lastUsedBy" TEXT;
