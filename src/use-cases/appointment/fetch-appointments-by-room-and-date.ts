import { AppointmentsRepository } from '@/repositories/appointments-repository'
import { Appointment } from '@prisma/client'

interface FetchAppointmentsByRoomAndDateUseCaseRequest {
  roomId: string
  date: Date
}

interface FetchAppointmentsByRoomAndDateUseCaseResponse {
  appointments: Appointment[]
}

export class FetchAppointmentsByRoomAndDateUseCase {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute({
    roomId,
    date,
  }: FetchAppointmentsByRoomAndDateUseCaseRequest): Promise<FetchAppointmentsByRoomAndDateUseCaseResponse> {
    const appointments =
      await this.appointmentsRepository.findManyAppointmentsByRoomAndDate(
        roomId,
        date,
      )

    return {
      appointments,
    }
  }
}
