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
    "applianceId" INTEGER,
    "cardNumber" TEXT NOT NULL,
    "expiryDateYear" INTEGER NOT NULL,
    "expiryDateMonth" INTEGER NOT NULL,
    "cvv" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Lead_processId_fkey" FOREIGN KEY ("processId") REFERENCES "Process" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Lead_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Lead_closerId_fkey" FOREIGN KEY ("closerId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Lead_applianceId_fkey" FOREIGN KEY ("applianceId") REFERENCES "Appliance" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Lead" ("accountName", "address", "applianceId", "bankName", "cardNumber", "centre", "city", "closerId", "comment", "country", "createdAt", "currency", "cvv", "dateOfBirth", "expiryDateMonth", "expiryDateYear", "fee", "firstName", "id", "lastName", "middleName", "password", "phone", "pincode", "planId", "processId", "sort", "title", "updatedAt") SELECT "accountName", "address", "applianceId", "bankName", "cardNumber", "centre", "city", "closerId", "comment", "country", "createdAt", "currency", "cvv", "dateOfBirth", "expiryDateMonth", "expiryDateYear", "fee", "firstName", "id", "lastName", "middleName", "password", "phone", "pincode", "planId", "processId", "sort", "title", "updatedAt" FROM "Lead";
DROP TABLE "Lead";
ALTER TABLE "new_Lead" RENAME TO "Lead";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
