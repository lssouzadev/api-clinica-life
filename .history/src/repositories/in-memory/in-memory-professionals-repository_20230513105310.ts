import { Prisma, Professional } from '@prisma/client'
import { ProfessionalsRepository } from '../professionals-repository'
import { randomUUID } from 'crypto'

export class InMemoryProfessionalsRepository
  implements ProfessionalsRepository
{
  public items: Professional[] = []
  async create(data: Prisma.ProfessionalUncheckedCreateInput) {
    const professional = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      cpf: data.cpf,
      avatar: data.avatar ?? null,
      specialty: data.specialty,
      phone: data.phone,
      clinic_id: data.clinic_id,
    }

    this.items.push(professional)

    return professional
  }

  async findByCpf(cpf: string) {
    const professional = this.items.find((item) => item.cpf === cpf)

    if (!professional) {
      return null
    }

    return professional
  }

  async findByEmail(email: string) {
    const professional = this.items.find((item) => item.email === email)

    if (!professional) {
      return null
    }

    return professional
  }

  async delete(professionalId: string) {
    const professionalIndex = this.items.findIndex(
      (item) => item.id === professionalId,
    )

    this.items.splice(professionalIndex, 1)
  }

  async findById(id: string) {
    const professional = this.items.find((item) => item.id === id)

    if (!professional) {
      return null
    }
  }

  async save(professional: Professional) {
    const professionalIndex = this.items.findIndex(
      (item) => item.id === professional.id,
    )

    if (professionalIndex >= 0) {
      this.items[professionalIndex] = professional
    }

    return professional
  }
}
