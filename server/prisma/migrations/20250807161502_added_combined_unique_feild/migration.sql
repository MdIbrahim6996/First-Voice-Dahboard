/*
  Warnings:

  - A unique constraint covering the columns `[date,month,year]` on the table `LeadCount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LeadCount_date_month_year_key" ON "LeadCount"("date", "month", "year");
