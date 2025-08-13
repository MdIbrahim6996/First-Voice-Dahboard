-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_processId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "processId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_processId_fkey" FOREIGN KEY ("processId") REFERENCES "Process"("id") ON DELETE SET NULL ON UPDATE CASCADE;
