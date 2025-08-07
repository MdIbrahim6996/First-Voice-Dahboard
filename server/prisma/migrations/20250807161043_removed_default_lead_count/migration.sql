-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LeadCount" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "count" INTEGER NOT NULL DEFAULT 0,
    "date" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "LeadCount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LeadCount" ("count", "createdAt", "date", "id", "month", "updatedAt", "userId", "year") SELECT "count", "createdAt", "date", "id", "month", "updatedAt", "userId", "year" FROM "LeadCount";
DROP TABLE "LeadCount";
ALTER TABLE "new_LeadCount" RENAME TO "LeadCount";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
