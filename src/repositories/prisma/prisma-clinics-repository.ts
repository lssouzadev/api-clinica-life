import { Prisma, Clinic } from '@prisma/client'
import { ClinicsRepository } from '../clinics-repository'
import { prisma } from '../../lib/prisma'

export class PrismaClinicsRepository implements ClinicsRepository {
  async create(data: Prisma.ClinicCreateInput): Promise<Clinic> {
    const clinic = await prisma.clinic.create({
      data,
    })

    return clinic
  }

  async findById(id: string): Promise<Clinic | null> {
    const clinic = await prisma.clinic.findUnique({
      where: {
        id,
      },
    })

    return clinic
  }
}
