-- CreateTable
CREATE TABLE "treatments" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price_treatment" TEXT NOT NULL,
    "cost_treatmento" TEXT NOT NULL,

    CONSTRAINT "treatments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient_tratments" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price_treatment" TEXT NOT NULL,
    "professional_id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,

    CONSTRAINT "patient_tratments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "patient_tratments_title_key" ON "patient_tratments"("title");

-- AddForeignKey
ALTER TABLE "patient_tratments" ADD CONSTRAINT "patient_tratments_professional_id_fkey" FOREIGN KEY ("professional_id") REFERENCES "professionals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_tratments" ADD CONSTRAINT "patient_tratments_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
