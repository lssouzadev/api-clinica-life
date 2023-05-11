import { TreatmentsRepository } from '@/repositories/treatments-repository'
import { Treatment } from '@prisma/client'

interface CreateTreatmentUseCaseRequest {
  title: string
  priceTreatment: string
  costTreatment: string
}

interface CreateTreatmentUseCaseResponse {
  treatment: Treatment
}

export class CreateTreatmentUseCase {
  constructor(private treatmentsRepository: TreatmentsRepository) {}

  async execute({
    title,
    priceTreatment,
    costTreatment,
  }: CreateTreatmentUseCaseRequest): Promise<CreateTreatmentUseCaseResponse> {
    const treatment = await this.treatmentsRepository.create({
      title,
      price_treatment: priceTreatment,
      cost_treatment: costTreatment,
    })

    return {
      treatment,
    }
  }
}
