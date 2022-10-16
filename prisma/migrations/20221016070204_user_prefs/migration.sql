/*
  Warnings:

  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Example";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "preferences" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    CONSTRAINT "preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "colorScheme" (
    "id" TEXT NOT NULL,
    "primary" TEXT NOT NULL,
    "primaryDark" TEXT NOT NULL,
    "secondary" TEXT NOT NULL,
    "secondaryDark" TEXT NOT NULL,
    "bg" TEXT NOT NULL,
    "bgDark" TEXT NOT NULL,
    "accent" TEXT NOT NULL,
    "accentDark" TEXT NOT NULL,
    "gray" TEXT NOT NULL,
    "grayDark" TEXT NOT NULL,
    "preferenceId" TEXT,
    CONSTRAINT "colorScheme_preferenceId_fkey" FOREIGN KEY ("preferenceId") REFERENCES "preferences" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "appDetail" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'appsolute',
    "useCase" TEXT NOT NULL DEFAULT 'developers',
    "domain" TEXT NOT NULL DEFAULT 'http://localhost:',
    "port" INTEGER NOT NULL DEFAULT 3000,
    "private" BOOLEAN NOT NULL DEFAULT true,
    "preferenceId" TEXT,
    CONSTRAINT "appDetail_preferenceId_fkey" FOREIGN KEY ("preferenceId") REFERENCES "preferences" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "preferences_userId_key" ON "preferences"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "colorScheme_id_key" ON "colorScheme"("id");

-- CreateIndex
CREATE UNIQUE INDEX "appDetail_id_key" ON "appDetail"("id");
