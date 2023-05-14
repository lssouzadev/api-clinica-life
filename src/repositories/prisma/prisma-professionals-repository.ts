import { Professional, Prisma } from '@prisma/client'
import { ProfessionalsRepository } from '../professionals-repository'
import { prisma } from '../../lib/prisma'

export class PrismaProfessionalsRepository implements ProfessionalsRepository {
  async create(data: Prisma.ProfessionalUncheckedCreateInput) {
    const professional = await prisma.professional.create({
      data,
    })

    return professional
  }

  async findByCpf(cpf: string) {
    const professional = await prisma.professional.findUnique({
      where: {
        cpf,
      },
    })

    if (!professional) {
      return null
    }

    return professional
  }

  async findByEmail(email: string) {
    const professional = await prisma.professional.findUnique({
      where: {
        email,
      },
    })

    if (!professional) {
      return null
    }

    return professional
  }

  async findById(id: string) {
    const professional = await prisma.professional.findUnique({
      where: {
        id,
      },
    })

    if (!professional) {
      return null
    }

    return professional
  }

  async delete(professionalId: string) {
    await prisma.professional.delete({
      where: {
        id: professionalId,
      },
    })
  }

  async save(data: Professional) {
    const professional = await prisma.professional.update({
      where: {
        id: data.id,
      },
      data,
    })

    return professional
  }
}
