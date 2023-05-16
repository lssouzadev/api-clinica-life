import { PrismaAppointmentsRepository } from '@/repositories/prisma/prisma-appointments-repository'
import { RegisterAppointmentUseCase } from '../appointment/register-appointment'
import { PrismaProfessionalRoomsRepository } from '@/repositories/prisma/prisma-professional-rooms-repository'
import { PrismaProfessionalsRepository } from '@/repositories/prisma/prisma-professionals-repository'
import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients-repository'
import { PrismaRoomsRepository } from '@/repositories/prisma/prisma-rooms-repository'

export function makeRegisterAppointmentUseCase() {
  const professionalsRepository = new PrismaProfessionalsRepository()
  const patientsRepository = new PrismaPatientsRepository()
  const roomsRepository = new PrismaRoomsRepository()
  const appointmentsRepository = new PrismaAppointmentsRepository()
  const professionalRoomsRepository = new PrismaProfessionalRoomsRepository()
  const registerAppointmentUseCase = new RegisterAppointmentUseCase(
    appointmentsRepository,
    professionalRoomsRepository,
    professionalsRepository,
    roomsRepository,
    patientsRepository,
  )

  return registerAppointmentUseCase
}
