-- AlterTable
ALTER TABLE "userTemplete" ADD COLUMN     "echoTips" TEXT[];

-- CreateTable
CREATE TABLE "slot" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "times" TEXT[],
    "userId" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "slot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "echo" (
    "id" TEXT NOT NULL,
    "name" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "tip" DOUBLE PRECISION NOT NULL,
    "priority" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "echo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "slot" ADD CONSTRAINT "slot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "echo" ADD CONSTRAINT "echo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
