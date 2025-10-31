/*
  Warnings:

  - You are about to drop the column `priority` on the `echo` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `echo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "echo" DROP COLUMN "priority",
DROP COLUMN "transactionId";
