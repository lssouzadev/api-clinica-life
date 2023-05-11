import { Prisma, Treatment } from '@prisma/client'
import { TreatmentsRepository } from '../treatments-repository'
import { randomUUID } from 'crypto'

export class InMemoryTreatmentsRepository implements TreatmentsRepository {
  public items: Treatment[] = []
  async create(data: Prisma.TreatmentCreateInput) {
    const treatment = {
      id: data.id ?? randomUUID(),
      title: data.title,
      price_treatment: data.price_treatment,
      cost_treatment: data.cost_treatment,
    }

    this.items.push(treatment)

    return treatment
  }

  async delete(professionalId: string) {
    const professionalIndex = this.items.findIndex(
      (item) => item.id === professionalId,
    )

    this.items.splice(professionalIndex, 1)
  }
}
