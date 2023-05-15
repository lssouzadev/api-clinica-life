import { PrismaProfessionalsRepository } from '@/repositories/prisma/prisma-professionals-repository'
import { GetProfessionalProfileUseCase } from '../professional/get-professional-profile'

export function makeGetProfessionalProfileUseCase() {
  const professionalsRepository = new PrismaProfessionalsRepository()
  const getProfessionalProfileUseCase = new GetProfessionalProfileUseCase(
    professionalsRepository,
  )
  return getProfessionalProfileUseCase
}
