/*
  Warnings:

  - You are about to drop the column `preferenceId` on the `colorScheme` table. All the data in the column will be lost.
  - Added the required column `colorSchemeId` to the `preferences` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_preferences" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "colorSchemeId" TEXT NOT NULL,
    CONSTRAINT "preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "preferences_colorSchemeId_fkey" FOREIGN KEY ("colorSchemeId") REFERENCES "colorScheme" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_preferences" ("id", "userId") SELECT "id", "userId" FROM "preferences";
DROP TABLE "preferences";
ALTER TABLE "new_preferences" RENAME TO "preferences";
CREATE UNIQUE INDEX "preferences_userId_key" ON "preferences"("userId");
CREATE TABLE "new_colorScheme" (
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
    "grayDark" TEXT NOT NULL
);
INSERT INTO "new_colorScheme" ("accent", "accentDark", "bg", "bgDark", "gray", "grayDark", "id", "primary", "primaryDark", "secondary", "secondaryDark") SELECT "accent", "accentDark", "bg", "bgDark", "gray", "grayDark", "id", "primary", "primaryDark", "secondary", "secondaryDark" FROM "colorScheme";
DROP TABLE "colorScheme";
ALTER TABLE "new_colorScheme" RENAME TO "colorScheme";
CREATE UNIQUE INDEX "colorScheme_id_key" ON "colorScheme"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
