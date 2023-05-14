import { PrismaAppointmentsRepository } from '@/repositories/prisma/prisma-appointments-repository'
import { GetPatientAppointmentsHistoryUseCase } from '../appointment/get-patient-appointments-history'

export function makeGetPatientAppointmentsHistoryUseCase() {
  const appointmentsRepository = new PrismaAppointmentsRepository()
  const getPatientAppointmentsHistoryUseCase =
    new GetPatientAppointmentsHistoryUseCase(appointmentsRepository)

  return getPatientAppointmentsHistoryUseCase
}
