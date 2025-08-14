/*
  Warnings:

  - You are about to drop the column `country` on the `Lead` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "country",
ADD COLUMN     "accountNumber" TEXT,
ADD COLUMN     "cardBankName" TEXT,
ADD COLUMN     "cardCvv" TEXT,
ADD COLUMN     "cardName" TEXT,
ADD COLUMN     "cardNumber" TEXT,
ADD COLUMN     "county" TEXT,
ADD COLUMN     "expiry" TEXT,
ADD COLUMN     "shift" TEXT;
