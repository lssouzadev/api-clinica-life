import { PrismaAppointmentsRepository } from '@/repositories/prisma/prisma-appointments-repository'
import { GetProfessionalAppointmentsUseCase } from '../appointment/get-professional-appointments'

export function makeGetProfessionalAppointmentsUseCase() {
  const appointmentsRepository = new PrismaAppointmentsRepository()
  const getProfessionalAppointmentsUseCase =
    new GetProfessionalAppointmentsUseCase(appointmentsRepository)

  return getProfessionalAppointmentsUseCase
}
