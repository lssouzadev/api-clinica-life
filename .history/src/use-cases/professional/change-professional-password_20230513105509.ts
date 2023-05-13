import { ProfessionalsRepository } from '@/repositories/professionals-repository'
import { Professional } from '@prisma/client'
import { ProfessionalNotFoundError } from '../@errors/professional-not-found-error'
import { compare, hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../@errors/invalid-credentials-error'

interface ChangeProfessionalPasswordUseCaseRequest {
  professionalId: string
  oldPassword: string
  newPassword: string
}

interface ChangeProfessionalPasswordUseCaseResponse {
  professional: Professional
}

export class ChangeProfessionalPasswordUseCase {
  constructor(private professionalsRepository: ProfessionalsRepository) {}

  async execute({
    professionalId,
    oldPassword,
    newPassword,
  }: ChangeProfessionalPasswordUseCaseRequest): Promise<ChangeProfessionalPasswordUseCaseResponse> {
    const professional = await this.professionalsRepository.findById(
      professionalId,
    )

    if (!professional) {
      throw new ProfessionalNotFoundError()
    }

    const isCorrectlyPasswordMatches = await compare(
      oldPassword,
      professional.password_hash,
    )

    if (!isCorrectlyPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    const newPassword_hash = await hash(newPassword, 6)

    professional.password_hash = newPassword_hash

    await this.professionalsRepository.save(professional)

    return {
      professional,
    }
  }
}
