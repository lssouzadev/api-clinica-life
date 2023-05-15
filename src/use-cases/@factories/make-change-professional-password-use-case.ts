import { ChangeUserPasswordUseCase } from '../user/change-user-password'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeChangeProfessionalPasswordUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const changeUserPasswordUseCase = new ChangeUserPasswordUseCase(
    usersRepository,
  )

  return changeUserPasswordUseCase
}
