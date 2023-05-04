import { ProfessionalsRepository } from '@/repositories/professionals-repository'
import { Professional } from '@prisma/client'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'

interface AuthenticateProfessionalUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateProfessionalUseCaseResponse {
  professional: Professional
}

export class AuthenticateProfessionalUseCase {
  constructor(private professionalsRepository: ProfessionalsRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateProfessionalUseCaseRequest): Promise<AuthenticateProfessionalUseCaseResponse> {
    const professional = await this.professionalsRepository.findByEmail(email)

    if (!professional) {
      throw new InvalidCredentialsError()
    }

    const isPasswordCorrectlyMatch = await compare(
      password,
      professional.password_hash,
    )

    if (!isPasswordCorrectlyMatch) {
      throw new InvalidCredentialsError()
    }

    return {
      professional,
    }
  }
}
