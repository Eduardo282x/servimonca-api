-- DropForeignKey
ALTER TABLE "Maintenance" DROP CONSTRAINT "Maintenance_equipmentId_fkey";

-- AlterTable
ALTER TABLE "Maintenance" ADD COLUMN     "equipmentClient" TEXT,
ALTER COLUMN "equipmentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Maintenance" ADD CONSTRAINT "Maintenance_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
