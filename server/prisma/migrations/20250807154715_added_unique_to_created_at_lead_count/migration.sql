/*
  Warnings:

  - A unique constraint covering the columns `[createdAt]` on the table `LeadCount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LeadCount_createdAt_key" ON "LeadCount"("createdAt");
