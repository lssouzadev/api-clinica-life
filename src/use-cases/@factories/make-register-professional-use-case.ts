import { PrismaProfessionalsRepository } from '../../repositories/prisma/prisma-professionals-repository'
import { RegisterProfessionalUseCase } from '../professional/register-professional'

export function makeRegisterProfessionalUseCase() {
  const professionalsRepository = new PrismaProfessionalsRepository()
  const registerProfessionalUseCase = new RegisterProfessionalUseCase(
    professionalsRepository,
  )

  return registerProfessionalUseCase
}
