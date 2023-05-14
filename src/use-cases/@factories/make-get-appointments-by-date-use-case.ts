import { PrismaAppointmentsRepository } from '@/repositories/prisma/prisma-appointments-repository'
import { GetAppointmentsByDateUseCase } from '../appointment/get-appointments-by-date'

export function makeGetAppointmentsByDateUseCase() {
  const appointmentsRepository = new PrismaAppointmentsRepository()
  const getAppointmentsByDateUseCase = new GetAppointmentsByDateUseCase(
    appointmentsRepository,
  )
  return getAppointmentsByDateUseCase
}
