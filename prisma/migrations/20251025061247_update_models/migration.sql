-- AlterEnum
ALTER TYPE "EchoStatus" ADD VALUE 'CANCELED';

-- AlterTable
ALTER TABLE "echo" ADD COLUMN     "transactionId" TEXT;
