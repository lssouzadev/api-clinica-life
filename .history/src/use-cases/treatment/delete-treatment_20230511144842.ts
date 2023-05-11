import { TreatmentsRepository } from '@/repositories/treatments-repository'

interface DeleteTreatmentUseCaseRequest {
  treatmentId: string
}

export class DeleteTreatmentUseCase {
  constructor(private treatmentsRepository: TreatmentsRepository) {}

  async execute({
    treatmentId,
  }: DeleteTreatmentUseCaseRequest): Promise<void> {}
}
