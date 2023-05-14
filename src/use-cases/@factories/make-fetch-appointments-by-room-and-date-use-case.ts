import { PrismaAppointmentsRepository } from '@/repositories/prisma/prisma-appointments-repository'
import { FetchAppointmentsByRoomAndDateUseCase } from '../appointment/fetch-appointments-by-room-and-date'

export function makeFetchAppointmentsByRoomAndDateUseCase() {
  const appointmentsRepository = new PrismaAppointmentsRepository()
  const fetchAppointmentsByRoomAndDateUseCase =
    new FetchAppointmentsByRoomAndDateUseCase(appointmentsRepository)

  return fetchAppointmentsByRoomAndDateUseCase
}
