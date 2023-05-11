import { AppointmentsRepository } from '@/repositories/appointments-repository'
import { Appointment } from '@prisma/client'

interface FetchAppointmentsByRoomUseCaseRequest {
  roomId: string
  date: Date
}

interface FetchAppointmentsByRoomUseCaseResponse {
  appointments: Appointment[]
}

export class FetchAppointmentsByRoomUseCase {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute({
    roomId,
    date,
  }: FetchAppointmentsByRoomUseCaseRequest): Promise<FetchAppointmentsByRoomUseCaseResponse> {
    const appointments =
      await this.appointmentsRepository.fetchAppointmentsByRoomAndDate(
        roomId,
        date,
      )
  }
}
