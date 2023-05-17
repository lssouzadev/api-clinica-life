import { PrismaProceduresRepository } from '@/repositories/prisma/prisma-procedures-repository'
import { CreateProcedureUseCase } from '../procedure/create-procedure'

export function makeCreateProcedureUseCase() {
  const proceduresRepository = new PrismaProceduresRepository()
  const createProcedureUseCase = new CreateProcedureUseCase(
    proceduresRepository,
  )

  return createProcedureUseCase
}
