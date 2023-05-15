/*
  Warnings:

  - Made the column `foreign_id` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "foreign_id" SET NOT NULL;
