import { Patient, Prisma } from '@prisma/client'

export interface PatientsRepository {
  create(data: Prisma.PatientCreateInput): Promise<Patient>
  findByDocument(cpf: string): Promise<Patient | null>
}
