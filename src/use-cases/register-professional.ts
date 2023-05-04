import { Professional } from '@prisma/client'
import { ProfessionalsRepository } from '../repositories/professionals-repository'
import { ProfessionalAlreadyExistsError } from './errors/professional-already-exists-error'
import { hash } from 'bcryptjs'

interface RegisterProfessionalUseCaseRequest {
  name: string
  email: string
  password: string
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
    email,
    password,
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

    const password_hash = await hash(password, 6)

    const professional = await this.professionalRepository.create({
      name,
      email,
      password_hash,
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
