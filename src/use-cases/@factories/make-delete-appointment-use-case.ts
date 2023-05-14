import { PrismaAppointmentsRepository } from '@/repositories/prisma/prisma-appointments-repository'
import { DeleteAppointmentUseCase } from '../appointment/delete-appointment'

export function MakeDeleteAppointmentUseCase() {
  const appointmentsRepository = new PrismaAppointmentsRepository()
  const deleteAppointmentUseCase = new DeleteAppointmentUseCase(
    appointmentsRepository,
  )

  return deleteAppointmentUseCase
}
