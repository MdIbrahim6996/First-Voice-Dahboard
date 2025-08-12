/*
  Warnings:

  - Made the column `phone` on table `Lead` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Lead" ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "bankName" DROP NOT NULL;
