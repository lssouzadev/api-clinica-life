import { Professional } from '@prisma/client'
import { ProfessionalsRepository } from '../repositories/professionals-repository'
import { ProfessionalAlreadyExistsError } from './errors/professional-already-exists-error'

interface RegisterProfessionalUseCaseRequest {
  name: string
  specialty: string
  phone: string
  cpf: string
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
    const professionalWithSameEmail =
      await this.professionalRepository.findByCpf(cpf)

    if (professionalWithSameEmail) {
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
