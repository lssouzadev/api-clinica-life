import { Prisma, Procedure } from '@prisma/client'

export interface ProceduresRepository {
  create(data: Prisma.ProcedureCreateInput): Promise<Procedure>
  delete(procedureId: string): Promise<void>
  findById(id: string): Promise<Procedure | null>
}
