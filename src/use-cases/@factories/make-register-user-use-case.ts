import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUserUseCase } from '../user/register-user'
import { PrismaProfessionalsRepository } from '@/repositories/prisma/prisma-professionals-repository'
import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients-repository'

export function makeRegisterUserUseCase() {
  const professionalsRepository = new PrismaProfessionalsRepository()
  const patientsRepository = new PrismaPatientsRepository()
  const usersRepository = new PrismaUsersRepository()
  const registerUserUseCase = new RegisterUserUseCase(
    usersRepository,
    professionalsRepository,
    patientsRepository,
  )

  return registerUserUseCase
}
