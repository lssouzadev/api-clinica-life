import { AppointmentsRepository } from '@/repositories/appointments-repository'
import { Appointment } from '@prisma/client'

interface GetAppointmentsByDateUseCaseRequest {
  date: Date
}

interface GetAppointmentsByDateUseCaseResponse {
  appointments: Appointment[]
}

export class GetAppointmentsByDateUseCase {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute({
    date,
  }: GetAppointmentsByDateUseCaseRequest): Promise<GetAppointmentsByDateUseCaseResponse> {
    const appointments =
      await this.appointmentsRepository.findManyAppointmentsByDate(date)

    return {
      appointments,
    }
  }
}
