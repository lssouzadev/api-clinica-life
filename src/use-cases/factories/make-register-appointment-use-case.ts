import { PrismaAppointmentsRepository } from '@/repositories/prisma/prisma-appointments-repository'
import { RegisterAppointmentUseCase } from '../register-appointment'

export function makeRegisterAppointmentUseCase() {
  const schedulesRepository = new PrismaAppointmentsRepository()
  const registerSchedulingUseCase = new RegisterAppointmentUseCase(
    schedulesRepository,
  )

  return registerSchedulingUseCase
}
