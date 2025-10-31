-- CreateEnum
CREATE TYPE "EchoStatus" AS ENUM ('PENDING', 'CONFIRMED', 'REJECTED', 'EXPIRED');

-- AlterTable
ALTER TABLE "echo" ADD COLUMN     "status" "EchoStatus" NOT NULL DEFAULT 'PENDING';
