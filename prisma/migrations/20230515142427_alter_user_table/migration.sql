-- RenameForeignKey
ALTER TABLE "users" RENAME CONSTRAINT "patient_id" TO "users_patient_id_fkey";

-- RenameForeignKey
ALTER TABLE "users" RENAME CONSTRAINT "professional_id" TO "users_professional_id_fkey";
