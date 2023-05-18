import { TreatmentsRepository } from '@/repositories/treatments-repository'
import { Treatment } from '@prisma/client'

interface FetchPatientTreatmentsUseCaseRequest {
  patientId: string
}

interface FetchPatientTreatmentsUseCaseResponse {
  treatments: Treatment[]
}

export class FetchPatientTreatmentsUseCase {
  constructor(private treatmentsRepository: TreatmentsRepository) {}

  async execute({
    patientId,
  }: FetchPatientTreatmentsUseCaseRequest): Promise<FetchPatientTreatmentsUseCaseResponse> {
    const treatments = await this.treatmentsRepository.findManyByPatientId(
      patientId,
    )

    return {
      treatments,
    }
  }
}
