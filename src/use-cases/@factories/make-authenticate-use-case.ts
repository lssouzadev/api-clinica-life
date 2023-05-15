import { AuthenticateUserUseCase } from '../user/authenticate'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUserUseCase(usersRepository)

  return authenticateUseCase
}
