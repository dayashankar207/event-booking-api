/*
  Warnings:

  - The values [confirmed,pending,cancelled] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[eventId,seatId,status]` on the table `bookings` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."OrderStatus_new" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'EXPIRED');
ALTER TABLE "public"."bookings" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."bookings" ALTER COLUMN "status" TYPE "public"."OrderStatus_new" USING ("status"::text::"public"."OrderStatus_new");
ALTER TYPE "public"."OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "public"."OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "public"."OrderStatus_old";
ALTER TABLE "public"."bookings" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterEnum
ALTER TYPE "public"."SeatStatus" ADD VALUE 'RESERVED';

-- DropIndex
DROP INDEX "public"."bookings_eventId_seatId_key";

-- DropIndex
DROP INDEX "public"."bookings_seatId_key";

-- AlterTable
ALTER TABLE "public"."bookings" ADD COLUMN     "expiresAt" TIMESTAMP(3),
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- CreateIndex
CREATE UNIQUE INDEX "bookings_eventId_seatId_status_key" ON "public"."bookings"("eventId", "seatId", "status");
