import { PrismaClinicsRepository } from '../../repositories/prisma/prisma-clinics-repository'
import { RegisterClinicUseCase } from '../register-clinic'

export function makeRegisterClinicUseCase() {
  const clinicsRepository = new PrismaClinicsRepository()
  const registerClinicUseCase = new RegisterClinicUseCase(clinicsRepository)

  return registerClinicUseCase
}
