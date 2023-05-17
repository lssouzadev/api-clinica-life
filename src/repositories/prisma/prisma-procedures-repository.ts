import { Prisma, Procedure } from '@prisma/client'
import { ProceduresRepository } from '../procedures-repository'
import { prisma } from '@/lib/prisma'

export class PrismaProceduresRepository implements ProceduresRepository {
  async create(data: Prisma.ProcedureCreateInput) {
    const procedure = await prisma.procedure.create({
      data,
    })

    return procedure
  }

  async delete(procedureId: string) {
    await prisma.procedure.delete({
      where: {
        id: procedureId,
      },
    })
  }

  async findById(id: string): Promise<Procedure | null> {
    const procedure = await prisma.procedure.findUnique({
      where: {
        id,
      },
    })

    if (!procedure) {
      return null
    }

    return procedure
  }
}
