/*
  Warnings:

  - Added the required column `password_hash` to the `professionals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "professionals" ADD COLUMN     "password_hash" TEXT NOT NULL;
