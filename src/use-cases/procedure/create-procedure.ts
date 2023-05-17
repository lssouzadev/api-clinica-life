import { ProceduresRepository } from '@/repositories/procedures-repository'
import { Procedure } from '@prisma/client'

interface CreateProcedureUseCaseRequest {
  title: string
  priceProcedure: string
  costProcedure: string
}

interface CreateProcedureUseCaseResponse {
  procedure: Procedure
}

export class CreateProcedureUseCase {
  constructor(private proceduresRepository: ProceduresRepository) {}

  async execute({
    title,
    priceProcedure,
    costProcedure,
  }: CreateProcedureUseCaseRequest): Promise<CreateProcedureUseCaseResponse> {
    const procedure = await this.proceduresRepository.create({
      title,
      price_procedure: priceProcedure,
      cost_procedure: costProcedure,
    })

    return {
      procedure,
    }
  }
}
