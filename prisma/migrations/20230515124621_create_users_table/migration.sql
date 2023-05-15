/*
  Warnings:

  - You are about to drop the column `email` on the `professionals` table. All the data in the column will be lost.
  - You are about to drop the column `password_hash` on the `professionals` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "professionals_email_key";

-- AlterTable
ALTER TABLE "professionals" DROP COLUMN "email",
DROP COLUMN "password_hash";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "foreign_id" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "professional_id" FOREIGN KEY ("foreign_id") REFERENCES "professionals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "patient_id" FOREIGN KEY ("foreign_id") REFERENCES "patients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
