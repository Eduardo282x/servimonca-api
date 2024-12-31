/*
  Warnings:

  - You are about to drop the column `address` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `contactDetails` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `currentStatus` on the `Equipment` table. All the data in the column will be lost.
  - Added the required column `customerAddress` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerEmail` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerLastname` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentStatusId` to the `Equipment` table without a default value. This is not possible if the table is not empty.
  - Made the column `dimensions` on table `Equipment` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `paymentId` to the `Rental` table without a default value. This is not possible if the table is not empty.
  - Made the column `totalCost` on table `Rental` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Equipment_serialNumber_key";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "address",
DROP COLUMN "contactDetails",
ADD COLUMN     "customerAddress" TEXT NOT NULL,
ADD COLUMN     "customerEmail" TEXT NOT NULL,
ADD COLUMN     "customerLastname" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Equipment" DROP COLUMN "currentStatus",
ADD COLUMN     "currentStatusId" INTEGER NOT NULL,
ALTER COLUMN "dimensions" SET NOT NULL;

-- AlterTable
ALTER TABLE "Rental" ADD COLUMN     "paymentId" INTEGER NOT NULL,
ALTER COLUMN "totalCost" SET NOT NULL;

-- CreateTable
CREATE TABLE "StatusEquipment" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "StatusEquipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "bank" TEXT NOT NULL,
    "identify" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypePayment" (
    "id" SERIAL NOT NULL,
    "typePayment" TEXT NOT NULL,

    CONSTRAINT "TypePayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rent" (
    "idRent" SERIAL NOT NULL,
    "equipment" INTEGER NOT NULL,
    "dateRegister" TIMESTAMP(3) NOT NULL,
    "dateDuration" TIMESTAMP(3) NOT NULL,
    "ClientId" INTEGER NOT NULL,
    "monto" INTEGER NOT NULL,
    "payment" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,

    CONSTRAINT "Rent_pkey" PRIMARY KEY ("idRent")
);

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_currentStatusId_fkey" FOREIGN KEY ("currentStatusId") REFERENCES "StatusEquipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rental" ADD CONSTRAINT "Rental_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "TypePayment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
