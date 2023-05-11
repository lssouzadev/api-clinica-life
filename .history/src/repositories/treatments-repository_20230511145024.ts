import { Prisma, Treatment } from '@prisma/client'

export interface TreatmentsRepository {
  create(data: Prisma.TreatmentCreateInput): Promise<Treatment>
  delete(treatmentId: string): Promise<void>
}
