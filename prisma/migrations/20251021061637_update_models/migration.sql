-- AlterTable
ALTER TABLE "user" ADD COLUMN     "ShowCalendar" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "accessToken" TEXT,
ADD COLUMN     "calendarId" TEXT;

-- CreateTable
CREATE TABLE "calenderEvent" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "calenderEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "calenderEvent" ADD CONSTRAINT "calenderEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
