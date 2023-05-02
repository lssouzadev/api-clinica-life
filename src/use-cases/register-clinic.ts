import { Clinic } from '@prisma/client'
import { ClinicsRepository } from '../repositories/clinics-repository'

interface RegisterClinicUseCaseRequest {
  name: string
  address: string
  phone: string
}

interface RegisterClinicUseCaseResponse {
  clinic: Clinic
}

export class RegisterClinicUseCase {
  constructor(private clinicsRepository: ClinicsRepository) {}

  async execute({
    name,
    address,
    phone,
  }: RegisterClinicUseCaseRequest): Promise<RegisterClinicUseCaseResponse> {
    const clinic = await this.clinicsRepository.create({
      name,
      address,
      phone,
    })

    return {
      clinic,
    }
  }
}
