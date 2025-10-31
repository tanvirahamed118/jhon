-- AlterTable
ALTER TABLE "echo" ADD COLUMN     "transactionId" TEXT,
ALTER COLUMN "tip" DROP NOT NULL;
