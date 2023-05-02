import { AppointmentsRepository } from '@/repositories/appointments-repository'
import { Appointment } from '@prisma/client'

interface GetProfessionalAppointmentsUseCaseRequest {
  date: Date
  professionalId: string
}

interface GetProfessionalAppointmentsUseCaseResponse {
  appointments: Appointment[]
}

export class GetProfessionalAppointmentsUseCase {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute({
    date,
    professionalId,
  }: GetProfessionalAppointmentsUseCaseRequest): Promise<GetProfessionalAppointmentsUseCaseResponse> {
    const appointments =
      await this.appointmentsRepository.findAppointmentsByProfessionalIdAndDate(
        professionalId,
        date,
      )

    return {
      appointments,
    }
  }
}
