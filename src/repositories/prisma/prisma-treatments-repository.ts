import { Prisma } from '@prisma/client'
import { TreatmentsRepository } from '../treatments-repository'
import { prisma } from '@/lib/prisma'

export class PrismaTreatmentsRepository implements TreatmentsRepository {
  async create(data: Prisma.TreatmentCreateInput) {
    const treatment = await prisma.treatment.create({
      data,
    })

    return treatment
  }

  async delete(treatmentId: string) {
    await prisma.treatment.delete({
      where: {
        id: treatmentId,
      },
    })
  }
}
