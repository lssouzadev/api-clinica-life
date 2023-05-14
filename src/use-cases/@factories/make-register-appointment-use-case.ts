import { PrismaAppointmentsRepository } from '@/repositories/prisma/prisma-appointments-repository'
import { RegisterAppointmentUseCase } from '../appointment/register-appointment'
import { PrismaProfessionalRoomsRepository } from '@/repositories/prisma/prisma-professional-rooms-repository'

export function makeRegisterAppointmentUseCase() {
  const appointmentsRepository = new PrismaAppointmentsRepository()
  const professionalRoomsRepository = new PrismaProfessionalRoomsRepository()
  const registerAppointmentUseCase = new RegisterAppointmentUseCase(
    appointmentsRepository,
    professionalRoomsRepository,
  )

  return registerAppointmentUseCase
}
