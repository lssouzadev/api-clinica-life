import { Prisma, Patient } from '@prisma/client'
import { PatientsRepository } from '../patients-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPatientsRepository implements PatientsRepository {
  async create(data: Prisma.PatientCreateInput): Promise<Patient> {
    const patient = await prisma.patient.create({
      data,
    })

    return patient
  }

  async findByDocument(cpf: string): Promise<Patient | null> {
    const patient = await prisma.patient.findUnique({
      where: {
        cpf,
      },
    })

    if (!patient) {
      return null
    }

    return patient
  }

  async findById(id: string) {
    const patient = await prisma.patient.findUnique({
      where: {
        id,
      },
    })

    if (!patient) {
      return null
    }

    return patient
  }
}
