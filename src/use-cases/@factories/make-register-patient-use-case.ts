import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients-repository'
import { RegisterPatientUseCase } from '../patient/register-patient'

export function makeRegisterPatientUseCase() {
  const patientsRepository = new PrismaPatientsRepository()
  const registerPatientUseCase = new RegisterPatientUseCase(patientsRepository)

  return registerPatientUseCase
}
