import { ProfessionalsRepository } from '@/repositories/professionals-repository'
import { Professional } from '@prisma/client'
import { ProfessionalNotFoundError } from '../@errors/professional-not-found-error'

interface GetProfessionalProfileUseCaseRequest {
  professionalId: string
}

interface GetProfessionalProfileUseCaseResponse {
  professional: Professional
}

export class GetProfessionalProfileUseCase {
  constructor(private professionalsRepository: ProfessionalsRepository) {}

  async execute({
    professionalId,
  }: GetProfessionalProfileUseCaseRequest): Promise<GetProfessionalProfileUseCaseResponse> {
    const professional = await this.professionalsRepository.findById(
      professionalId,
    )

    if (!professional) {
      throw new ProfessionalNotFoundError()
    }

    return {
      professional,
    }
  }
}
