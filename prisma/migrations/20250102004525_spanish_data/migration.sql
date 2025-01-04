/*
  Warnings:

  - You are about to drop the column `reportData` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `reportDate` on the `Report` table. All the data in the column will be lost.
  - Made the column `description` on table `Maintenance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Report` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `SparePart` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `SparePartHistory` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `WorkOrder` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Maintenance" ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "reportData",
DROP COLUMN "reportDate",
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "SparePart" ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "SparePartHistory" ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "WorkOrder" ALTER COLUMN "description" SET NOT NULL;
