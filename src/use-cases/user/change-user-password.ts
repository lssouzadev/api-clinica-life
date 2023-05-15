import { User } from '@prisma/client'
import { compare, hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../@errors/invalid-credentials-error'
import { UserNotFoundError } from '../@errors/user-not-found-error'
import { UsersRepository } from '@/repositories/users-repository'

interface ChangeUserPasswordUseCaseRequest {
  userId: string
  oldPassword: string
  newPassword: string
}

interface ChangeUserPasswordUseCaseResponse {
  user: User
}

export class ChangeUserPasswordUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    oldPassword,
    newPassword,
  }: ChangeUserPasswordUseCaseRequest): Promise<ChangeUserPasswordUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new UserNotFoundError()
    }

    const isCorrectlyPasswordMatches = await compare(
      oldPassword,
      user.password_hash,
    )

    if (!isCorrectlyPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    const newPassword_hash = await hash(newPassword, 6)

    user.password_hash = newPassword_hash

    await this.usersRepository.save(user)

    return {
      user,
    }
  }
}
