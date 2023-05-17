/*
  Warnings:

  - You are about to drop the column `cost_treatment` on the `procedures` table. All the data in the column will be lost.
  - You are about to drop the column `price_treatment` on the `procedures` table. All the data in the column will be lost.
  - Added the required column `cost_procedure` to the `procedures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_procedure` to the `procedures` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "procedures" DROP COLUMN "cost_treatment",
DROP COLUMN "price_treatment",
ADD COLUMN     "cost_procedure" TEXT NOT NULL,
ADD COLUMN     "price_procedure" TEXT NOT NULL;
