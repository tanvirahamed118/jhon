/*
  Warnings:

  - You are about to drop the column `name` on the `contact` table. All the data in the column will be lost.
  - Added the required column `firstname` to the `contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `niche` to the `contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contact" DROP COLUMN "name",
ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "niche" TEXT NOT NULL;
