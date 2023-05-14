import { PrismaTreatmentsRepository } from '@/repositories/prisma/prisma-treatments-repository'
import { CreateTreatmentUseCase } from '../treatment/create-treatment'

export function makeCreateTreatmentUseCase() {
  const treatmentsRepository = new PrismaTreatmentsRepository()
  const createTreatmentUseCase = new CreateTreatmentUseCase(
    treatmentsRepository,
  )

  return createTreatmentUseCase
}
