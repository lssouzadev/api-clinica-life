import { ProceduresRepository } from '@/repositories/procedures-repository'

interface DeleteProcedureUseCaseRequest {
  procedureId: string
}

export class DeleteProcedureUseCase {
  constructor(private proceduresRepository: ProceduresRepository) {}

  async execute({ procedureId }: DeleteProcedureUseCaseRequest): Promise<void> {
    await this.proceduresRepository.delete(procedureId)
  }
}
