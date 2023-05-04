import { ProfessionalsRepository } from '@/repositories/professionals-repository'

interface DeleteProfessionalUseCaseRequest {
  professionalId: string
}

export class DeleteProfessionalUseCase {
  constructor(private professionalsRepository: ProfessionalsRepository) {}

  async execute({
    professionalId,
  }: DeleteProfessionalUseCaseRequest): Promise<void> {
    await this.professionalsRepository.delete(professionalId)
  }
}
