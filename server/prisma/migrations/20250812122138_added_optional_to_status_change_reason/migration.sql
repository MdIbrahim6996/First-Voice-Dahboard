-- DropForeignKey
ALTER TABLE "StatusChangeReason" DROP CONSTRAINT "StatusChangeReason_leadId_fkey";

-- DropForeignKey
ALTER TABLE "StatusChangeReason" DROP CONSTRAINT "StatusChangeReason_userId_fkey";

-- AddForeignKey
ALTER TABLE "StatusChangeReason" ADD CONSTRAINT "StatusChangeReason_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatusChangeReason" ADD CONSTRAINT "StatusChangeReason_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;
