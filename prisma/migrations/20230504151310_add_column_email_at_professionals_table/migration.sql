/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `professionals` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `professionals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "professionals" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "professionals_email_key" ON "professionals"("email");
