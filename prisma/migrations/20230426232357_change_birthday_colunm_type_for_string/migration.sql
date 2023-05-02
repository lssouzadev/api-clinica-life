/*
  Warnings:

  - Made the column `birthday` on table `patients` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "patients" ALTER COLUMN "birthday" SET NOT NULL,
ALTER COLUMN "birthday" SET DATA TYPE TEXT;
