import { Professional, Prisma } from '@prisma/client'

export interface ProfessionalsRepository {
  create(data: Prisma.ProfessionalUncheckedCreateInput): Promise<Professional>
  findByCpf(cpf: string): Promise<Professional | null>
  findByEmail(email: string): Promise<Professional | null>
  findById(id: string): Promise<Professional | null>
  delete(professionalId: string): Promise<void>
  save(professional: Professional): Promise<Professional>
}
