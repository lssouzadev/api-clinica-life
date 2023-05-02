/*
  Warnings:

  - You are about to drop the column `room_id` on the `professionals` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "professionals" DROP CONSTRAINT "professionals_room_id_fkey";

-- AlterTable
ALTER TABLE "professionals" DROP COLUMN "room_id";

-- CreateTable
CREATE TABLE "professional_rooms" (
    "id" TEXT NOT NULL,
    "professional_id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,

    CONSTRAINT "professional_rooms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "professional_rooms" ADD CONSTRAINT "professional_rooms_professional_id_fkey" FOREIGN KEY ("professional_id") REFERENCES "professionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professional_rooms" ADD CONSTRAINT "professional_rooms_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
