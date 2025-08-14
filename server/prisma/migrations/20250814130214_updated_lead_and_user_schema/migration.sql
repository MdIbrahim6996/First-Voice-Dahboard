-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "leadByUserId" INTEGER,
ADD COLUMN     "verifierId" INTEGER;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_leadByUserId_fkey" FOREIGN KEY ("leadByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_verifierId_fkey" FOREIGN KEY ("verifierId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
