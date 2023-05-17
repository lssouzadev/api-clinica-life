/*
  Warnings:

  - You are about to drop the `treatments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "treatments";

-- CreateTable
CREATE TABLE "procedures" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price_treatment" TEXT NOT NULL,
    "cost_treatment" TEXT NOT NULL,

    CONSTRAINT "procedures_pkey" PRIMARY KEY ("id")
);
