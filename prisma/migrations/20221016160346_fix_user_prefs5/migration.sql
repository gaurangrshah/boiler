/*
  Warnings:

  - You are about to drop the column `colorSchemeId` on the `preferences` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_colorScheme" (
    "id" TEXT NOT NULL,
    "primary" TEXT NOT NULL DEFAULT '#2e5cb8',
    "primaryDark" TEXT NOT NULL DEFAULT '#1a3366',
    "secondary" TEXT NOT NULL DEFAULT '#4775d1',
    "secondaryDark" TEXT NOT NULL DEFAULT '#7094db',
    "bg" TEXT NOT NULL DEFAULT '#ebf0fa',
    "bgDark" TEXT NOT NULL DEFAULT '#050a14',
    "accent" TEXT NOT NULL DEFAULT '#99b3e5',
    "accentDark" TEXT NOT NULL DEFAULT '#24478f',
    "gray" TEXT NOT NULL DEFAULT '#eeeeee',
    "grayDark" TEXT NOT NULL DEFAULT '#999999',
    "preferenceId" TEXT,
    CONSTRAINT "colorScheme_preferenceId_fkey" FOREIGN KEY ("preferenceId") REFERENCES "preferences" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_colorScheme" ("accent", "accentDark", "bg", "bgDark", "gray", "grayDark", "id", "primary", "primaryDark", "secondary", "secondaryDark") SELECT "accent", "accentDark", "bg", "bgDark", "gray", "grayDark", "id", "primary", "primaryDark", "secondary", "secondaryDark" FROM "colorScheme";
DROP TABLE "colorScheme";
ALTER TABLE "new_colorScheme" RENAME TO "colorScheme";
CREATE UNIQUE INDEX "colorScheme_id_key" ON "colorScheme"("id");
CREATE TABLE "new_preferences" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    CONSTRAINT "preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_preferences" ("id", "userId") SELECT "id", "userId" FROM "preferences";
DROP TABLE "preferences";
ALTER TABLE "new_preferences" RENAME TO "preferences";
CREATE UNIQUE INDEX "preferences_userId_key" ON "preferences"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
