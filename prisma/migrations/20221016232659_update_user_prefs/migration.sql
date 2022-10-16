-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_preferences" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "theme" TEXT NOT NULL DEFAULT 'default',
    "userId" TEXT,
    CONSTRAINT "preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_preferences" ("id", "userId") SELECT "id", "userId" FROM "preferences";
DROP TABLE "preferences";
ALTER TABLE "new_preferences" RENAME TO "preferences";
CREATE UNIQUE INDEX "preferences_userId_key" ON "preferences"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
