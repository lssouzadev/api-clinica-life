import { Professional, Prisma } from '@prisma/client'

export interface ProfessionalsRepository {
  create(data: Prisma.ProfessionalUncheckedCreateInput): Promise<Professional>
  findByCpf(cpf: string): Promise<Professional | null>
  delete(professionalId: string): Promise<void>
}
