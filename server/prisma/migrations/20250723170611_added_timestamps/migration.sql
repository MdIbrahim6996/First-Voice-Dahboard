/*
  Warnings:

  - You are about to drop the column `plan` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `process` on the `Lead` table. All the data in the column will be lost.
  - Added the required column `planId` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `processId` to the `Lead` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Lead` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lead" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "centre" TEXT NOT NULL,
    "address" TEXT,
    "city" TEXT,
    "country" TEXT,
    "pincode" TEXT NOT NULL,
    "password" TEXT,
    "dateOfBirth" DATETIME,
    "phone" TEXT,
    "processId" INTEGER NOT NULL,
    "planId" INTEGER NOT NULL,
    "closerId" INTEGER,
    "fee" INTEGER,
    "currency" TEXT,
    "bankName" TEXT NOT NULL,
    "accountName" TEXT,
    "sort" TEXT,
    "cardNumber" TEXT NOT NULL,
    "expiryDateYear" INTEGER NOT NULL,
    "expiryDateMonth" INTEGER NOT NULL,
    "cvv" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Lead_processId_fkey" FOREIGN KEY ("processId") REFERENCES "Process" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Lead_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Lead_closerId_fkey" FOREIGN KEY ("closerId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Lead" ("accountName", "address", "bankName", "cardNumber", "centre", "city", "closerId", "comment", "country", "currency", "cvv", "dateOfBirth", "expiryDateMonth", "expiryDateYear", "fee", "firstName", "id", "lastName", "middleName", "password", "phone", "pincode", "sort", "title") SELECT "accountName", "address", "bankName", "cardNumber", "centre", "city", "closerId", "comment", "country", "currency", "cvv", "dateOfBirth", "expiryDateMonth", "expiryDateYear", "fee", "firstName", "id", "lastName", "middleName", "password", "phone", "pincode", "sort", "title" FROM "Lead";
DROP TABLE "Lead";
ALTER TABLE "new_Lead" RENAME TO "Lead";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
