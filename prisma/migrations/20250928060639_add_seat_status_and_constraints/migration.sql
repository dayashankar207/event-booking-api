/*
  Warnings:

  - You are about to drop the column `number` on the `seats` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[eventId,label]` on the table `seats` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `label` to the `seats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `seats` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."SeatStatus" AS ENUM ('AVAILABLE', 'BOOKED');

-- AlterTable
ALTER TABLE "public"."seats" DROP COLUMN "number",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "status" "public"."SeatStatus" NOT NULL DEFAULT 'AVAILABLE',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "seats_eventId_label_key" ON "public"."seats"("eventId", "label");
