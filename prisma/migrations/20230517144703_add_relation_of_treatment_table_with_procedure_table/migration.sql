/*
  Warnings:

  - Added the required column `procedure_id` to the `treatments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "treatments" ADD COLUMN     "procedure_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "treatments" ADD CONSTRAINT "treatments_procedure_id_fkey" FOREIGN KEY ("procedure_id") REFERENCES "procedures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
