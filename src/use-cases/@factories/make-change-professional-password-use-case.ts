import { PrismaProfessionalsRepository } from '@/repositories/prisma/prisma-professionals-repository'
import { ChangeProfessionalPasswordUseCase } from '../professional/change-professional-password'

export function makeChangeProfessionalPasswordUseCase() {
  const professionalsRepository = new PrismaProfessionalsRepository()
  const changeProfessionalPasswordUseCase =
    new ChangeProfessionalPasswordUseCase(professionalsRepository)

  return changeProfessionalPasswordUseCase
}
