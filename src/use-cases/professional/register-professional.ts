import { Professional } from '@prisma/client'
import { ProfessionalsRepository } from '@/repositories/professionals-repository'
import { ProfessionalAlreadyExistsError } from '../@errors/professional-already-exists-error'

interface RegisterProfessionalUseCaseRequest {
  name: string
  cpf: string
  specialty: string
  phone: string
  clinicId: string
}

interface RegisterProfessionalUseCaseResponse {
  professional: Professional
}

export class RegisterProfessionalUseCase {
  constructor(private professionalRepository: ProfessionalsRepository) {}

  async execute({
    name,
    specialty,
    cpf,
    phone,
    clinicId,
  }: RegisterProfessionalUseCaseRequest): Promise<RegisterProfessionalUseCaseResponse> {
    const professionalWithSameCpf = await this.professionalRepository.findByCpf(
      cpf,
    )

    if (professionalWithSameCpf) {
      throw new ProfessionalAlreadyExistsError()
    }

    const professional = await this.professionalRepository.create({
      name,
      specialty,
      cpf,
      phone,
      clinic_id: clinicId,
    })

    return {
      professional,
    }
  }
}
