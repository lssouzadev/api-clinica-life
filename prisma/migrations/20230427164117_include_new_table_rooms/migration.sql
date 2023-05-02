/*
  Warnings:

  - Added the required column `room_id` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_id` to the `professionals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "room_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "professionals" ADD COLUMN     "room_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "rooms" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "professionals" ADD CONSTRAINT "professionals_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
