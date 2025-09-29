/*
  Warnings:

  - You are about to drop the column `label` on the `seats` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[eventId,number]` on the table `seats` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `seats` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."seats_eventId_label_key";

-- AlterTable
ALTER TABLE "public"."seats" DROP COLUMN "label",
ADD COLUMN     "number" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "seats_eventId_number_key" ON "public"."seats"("eventId", "number");
