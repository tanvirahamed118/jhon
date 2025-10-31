/*
  Warnings:

  - You are about to drop the column `verify` on the `user` table. All the data in the column will be lost.
  - The `status` column on the `userMembership` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[userId]` on the table `userMembership` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ActivationStatus" AS ENUM ('PENDING', 'ACTIVATE', 'DEACTIVATE', 'SUSPEND');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "verify",
ADD COLUMN     "status" "ActivationStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "userMembership" DROP COLUMN "status",
ADD COLUMN     "status" "ActivationStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "userTemplete" ADD COLUMN     "status" "ActivationStatus" NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE UNIQUE INDEX "userMembership_userId_key" ON "userMembership"("userId");
