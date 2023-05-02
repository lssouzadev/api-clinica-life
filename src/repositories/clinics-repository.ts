import { Clinic, Prisma } from '@prisma/client'

export interface ClinicsRepository {
  create(data: Prisma.ClinicCreateInput): Promise<Clinic>
  findById(id: string): Promise<Clinic | null>
}
