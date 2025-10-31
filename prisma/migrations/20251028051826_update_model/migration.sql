/*
  Warnings:

  - The `activate_at` column on the `userMembership` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "userMembership" DROP COLUMN "activate_at",
ADD COLUMN     "activate_at" TIMESTAMP(3);
