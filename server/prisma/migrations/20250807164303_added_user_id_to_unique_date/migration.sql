/*
  Warnings:

  - A unique constraint covering the columns `[date,month,year,userId]` on the table `LeadCount` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "LeadCount_date_month_year_key";

-- CreateIndex
CREATE UNIQUE INDEX "LeadCount_date_month_year_userId_key" ON "LeadCount"("date", "month", "year", "userId");
