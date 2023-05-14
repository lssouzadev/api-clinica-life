import { ProfessionalsRepository } from '@/repositories/professionals-repository'
import { Professional } from '@prisma/client'

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
  }
}