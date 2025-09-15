/*
  Warnings:

  - You are about to drop the column `thinkness` on the `Facade` table. All the data in the column will be lost.
  - Made the column `phone` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `thickness` to the `Facade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `advance` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryAddress` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workType` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL
);
INSERT INTO "new_Customer" ("id", "name", "phone") SELECT "id", "name", "phone" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE TABLE "new_Facade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "height" REAL NOT NULL,
    "width" REAL NOT NULL,
    "thickness" REAL NOT NULL,
    "handleId" INTEGER NOT NULL,
    "radius" REAL NOT NULL,
    "millingId" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    CONSTRAINT "Facade_handleId_fkey" FOREIGN KEY ("handleId") REFERENCES "Handle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Facade_millingId_fkey" FOREIGN KEY ("millingId") REFERENCES "Milling" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Facade_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Facade" ("color", "count", "handleId", "height", "id", "millingId", "orderId", "radius", "width") SELECT "color", "count", "handleId", "height", "id", "millingId", "orderId", "radius", "width" FROM "Facade";
DROP TABLE "Facade";
ALTER TABLE "new_Facade" RENAME TO "Facade";
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerId" INTEGER NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "deliveryAddress" TEXT NOT NULL,
    "workType" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "advance" REAL NOT NULL,
    "discount" REAL NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("createdAt", "customerId", "id", "orderNumber", "status") SELECT "createdAt", "customerId", "id", "orderNumber", "status" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
