import { Prisma, Treatment } from '@prisma/client'

export interface TreatmentsRepository {
  create(data: Prisma.TreatmentUncheckedCreateInput): Promise<Treatment>
  findById(id: string): Promise<Treatment | null>
}
