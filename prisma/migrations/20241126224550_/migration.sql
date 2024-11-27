/*
  Warnings:

  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.
  - Added the required column `personNumber` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `round` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tableNumber` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MenuItem" ADD COLUMN     "dairyFree" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "glutenFree" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "nutFree" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "spicy" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "vegan" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "vegetarian" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "status",
ADD COLUMN     "personNumber" INTEGER NOT NULL,
ADD COLUMN     "round" INTEGER NOT NULL,
ADD COLUMN     "tableNumber" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
