/*
  Warnings:

  - You are about to drop the column `templateId` on the `referralCustomer` table. All the data in the column will be lost.
  - You are about to drop the column `affiliate` on the `user` table. All the data in the column will be lost.
  - The `discount` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "referralCustomer" DROP CONSTRAINT "referralCustomer_templateId_fkey";

-- AlterTable
ALTER TABLE "referralCustomer" DROP COLUMN "templateId";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "affiliate",
DROP COLUMN "discount",
ADD COLUMN     "discount" BOOLEAN NOT NULL DEFAULT false;
