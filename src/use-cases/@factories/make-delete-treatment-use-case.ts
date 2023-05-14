import { PrismaTreatmentsRepository } from '@/repositories/prisma/prisma-treatments-repository'
import { DeleteTreatmentUseCase } from '../treatment/delete-treatment'

export function makeDeleteTreatmentUseCase() {
  const treatmentsRepository = new PrismaTreatmentsRepository()
  const deleteTreatmentUseCase = new DeleteTreatmentUseCase(
    treatmentsRepository,
  )

  return deleteTreatmentUseCase
}
