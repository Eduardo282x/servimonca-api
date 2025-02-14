/*
  Warnings:

  - You are about to drop the column `checked` on the `Rental` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Rental" DROP COLUMN "checked",
ALTER COLUMN "rentalStartDate" DROP NOT NULL,
ALTER COLUMN "rentalEndDate" DROP NOT NULL,
ALTER COLUMN "status" SET DATA TYPE TEXT;
