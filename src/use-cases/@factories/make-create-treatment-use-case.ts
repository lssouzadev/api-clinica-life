import { PrismaTreatmentsRepository } from '@/repositories/prisma/prisma-treatments-repository'
import { CreateTreatmentUseCase } from '../treatment/create-treatment'
import { PrismaProceduresRepository } from '@/repositories/prisma/prisma-procedures-repository'

export function makeCreateTreatmentUseCase() {
  const proceduresRepository = new PrismaProceduresRepository()
  const treatmentsRepository = new PrismaTreatmentsRepository()
  const createTreatmentUseCase = new CreateTreatmentUseCase(
    treatmentsRepository,
    proceduresRepository,
  )

  return createTreatmentUseCase
}
