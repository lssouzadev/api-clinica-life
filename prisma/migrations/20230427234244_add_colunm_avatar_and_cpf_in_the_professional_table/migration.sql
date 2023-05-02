/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `professionals` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `professionals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "professionals" ADD COLUMN     "avatar" BYTEA,
ADD COLUMN     "cpf" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "professionals_cpf_key" ON "professionals"("cpf");
