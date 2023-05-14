import { PrismaProfessionalsRepository } from '@/repositories/prisma/prisma-professionals-repository'
import { AuthenticateProfessionalUseCase } from '../professional/authenticate-professional'

export function makeAuthenticateProfessionalUseCase() {
  const professionalsRepository = new PrismaProfessionalsRepository()
  const authenticateProfessionalUseCase = new AuthenticateProfessionalUseCase(
    professionalsRepository,
  )

  return authenticateProfessionalUseCase
}
