/*
  Warnings:

  - You are about to drop the `patient_tratments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "patient_tratments" DROP CONSTRAINT "patient_tratments_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "patient_tratments" DROP CONSTRAINT "patient_tratments_professional_id_fkey";

-- DropTable
DROP TABLE "patient_tratments";

-- CreateTable
CREATE TABLE "treatments" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price_treatment" TEXT NOT NULL,
    "professional_id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,

    CONSTRAINT "treatments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "treatments_title_key" ON "treatments"("title");

-- AddForeignKey
ALTER TABLE "treatments" ADD CONSTRAINT "treatments_professional_id_fkey" FOREIGN KEY ("professional_id") REFERENCES "professionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatments" ADD CONSTRAINT "treatments_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
