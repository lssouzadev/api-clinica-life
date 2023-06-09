import { ProceduresRepository } from '@/repositories/procedures-repository'
import { TreatmentsRepository } from '@/repositories/treatments-repository'
import { Treatment } from '@prisma/client'
import { ProcedureNotFoundError } from '../@errors/procedure-not-found-error'

interface CreateTreatmentUseCaseRequest {
  procedureId: string
  professionalId: string
  patientId: string
}

interface CreateTreatmentUseCaseResponse {
  treatment: Treatment
}

export class CreateTreatmentUseCase {
  constructor(
    private treatmentsRepository: TreatmentsRepository,
    private proceduresRepository: ProceduresRepository,
  ) {}

  async execute({
    procedureId,
    professionalId,
    patientId,
  }: CreateTreatmentUseCaseRequest): Promise<CreateTreatmentUseCaseResponse> {
    const procedure = await this.proceduresRepository.findById(procedureId)

    if (!procedure) {
      throw new ProcedureNotFoundError()
    }

    const treatment = await this.treatmentsRepository.create({
      title: procedure.title,
      procedure_id: procedureId,
      patient_id: patientId,
      price_treatment: procedure.price_procedure,
      professional_id: professionalId,
    })

    return {
      treatment,
    }
  }
}
