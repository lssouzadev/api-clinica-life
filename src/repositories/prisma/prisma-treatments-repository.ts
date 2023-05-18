import { Prisma, Treatment } from '@prisma/client'
import { TreatmentsRepository } from '../treatments-repository'
import { prisma } from '@/lib/prisma'

export class PrismaTreatmentsRepository implements TreatmentsRepository {
  async create(data: Prisma.TreatmentUncheckedCreateInput): Promise<Treatment> {
    const treatment = await prisma.treatment.create({
      data,
    })

    return treatment
  }

  async findById(id: string) {
    const treatment = await prisma.treatment.findUnique({
      where: {
        id,
      },
    })

    if (!treatment) {
      return null
    }

    return treatment
  }

  async findManyByPatientId(patientId: string) {
    const treatments = await prisma.treatment.findMany({
      where: {
        patient_id: patientId,
      },
    })

    return treatments
  }
}
