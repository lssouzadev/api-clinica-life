/*
  Warnings:

  - You are about to drop the column `cost_treatmento` on the `treatments` table. All the data in the column will be lost.
  - Added the required column `cost_treatment` to the `treatments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "treatments" DROP COLUMN "cost_treatmento",
ADD COLUMN     "cost_treatment" TEXT NOT NULL;
