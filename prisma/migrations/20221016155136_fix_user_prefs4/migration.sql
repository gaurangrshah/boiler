-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_appDetails" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'appsolute',
    "useCase" TEXT NOT NULL DEFAULT 'developers',
    "domain" TEXT NOT NULL DEFAULT 'http://localhost:',
    "port" INTEGER NOT NULL DEFAULT 3000,
    "private" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT,
    CONSTRAINT "appDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_appDetails" ("domain", "id", "name", "port", "private", "useCase", "userId") SELECT "domain", "id", "name", "port", "private", "useCase", "userId" FROM "appDetails";
DROP TABLE "appDetails";
ALTER TABLE "new_appDetails" RENAME TO "appDetails";
CREATE UNIQUE INDEX "appDetails_id_key" ON "appDetails"("id");
CREATE UNIQUE INDEX "appDetails_userId_key" ON "appDetails"("userId");
CREATE TABLE "new_preferences" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "colorSchemeId" TEXT,
    CONSTRAINT "preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "preferences_colorSchemeId_fkey" FOREIGN KEY ("colorSchemeId") REFERENCES "colorScheme" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_preferences" ("colorSchemeId", "id", "userId") SELECT "colorSchemeId", "id", "userId" FROM "preferences";
DROP TABLE "preferences";
ALTER TABLE "new_preferences" RENAME TO "preferences";
CREATE UNIQUE INDEX "preferences_userId_key" ON "preferences"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
