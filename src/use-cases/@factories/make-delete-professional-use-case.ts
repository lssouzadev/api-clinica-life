import { PrismaProfessionalsRepository } from '@/repositories/prisma/prisma-professionals-repository'
import { DeleteProfessionalUseCase } from '../professional/delete-professional'

export function makeDeleteProfessionalUseCase() {
  const professionalsRepository = new PrismaProfessionalsRepository()
  const deleteProfessionalUseCase = new DeleteProfessionalUseCase(
    professionalsRepository,
  )

  return deleteProfessionalUseCase
}
