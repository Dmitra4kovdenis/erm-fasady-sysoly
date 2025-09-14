/*
  Warnings:

  - You are about to drop the `OrderItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `managerId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `orderNumber` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "OrderItem";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Product";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Handle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Milling" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Facade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "height" REAL NOT NULL,
    "width" REAL NOT NULL,
    "thinkness" REAL NOT NULL,
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

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerId" INTEGER NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("createdAt", "customerId", "id", "status") SELECT "createdAt", "customerId", "id", "status" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
