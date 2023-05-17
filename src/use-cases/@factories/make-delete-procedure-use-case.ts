import { PrismaProceduresRepository } from '@/repositories/prisma/prisma-procedures-repository'
import { DeleteProcedureUseCase } from '../procedure/delete-procedure'

export function makeDeleteProcedureUseCase() {
  const proceduresRepository = new PrismaProceduresRepository()
  const deleteProcedureUseCase = new DeleteProcedureUseCase(
    proceduresRepository,
  )

  return deleteProcedureUseCase
}
