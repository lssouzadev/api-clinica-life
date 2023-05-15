-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "patient_id";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "professional_id";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "patient_id" TEXT,
ADD COLUMN     "professional_id" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "professional_id" FOREIGN KEY ("professional_id") REFERENCES "professionals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "patient_id" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
