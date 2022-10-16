/*
  Warnings:

  - You are about to drop the `appDetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "appDetail";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "appDetails" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'appsolute',
    "useCase" TEXT NOT NULL DEFAULT 'developers',
    "domain" TEXT NOT NULL DEFAULT 'http://localhost:',
    "port" INTEGER NOT NULL DEFAULT 3000,
    "private" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,
    CONSTRAINT "appDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "appDetails_id_key" ON "appDetails"("id");

-- CreateIndex
CREATE UNIQUE INDEX "appDetails_userId_key" ON "appDetails"("userId");
