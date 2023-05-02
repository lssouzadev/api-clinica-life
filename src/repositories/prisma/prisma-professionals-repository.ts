import { Professional, Prisma } from '@prisma/client'
import { ProfessionalsRepository } from '../professionals-repository'
import { prisma } from '../../lib/prisma'

export class PrismaProfessionalsRepository implements ProfessionalsRepository {
  async create(
    data: Prisma.ProfessionalUncheckedCreateInput,
  ): Promise<Professional> {
    const professional = await prisma.professional.create({
      data,
    })

    return professional
  }
}
