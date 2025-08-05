-- CreateTable
CREATE TABLE "Process" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Process_name_key" ON "Process"("name");
