import { AppointmentsRepository } from '@/repositories/appointments-repository'
import { Appointment } from '@prisma/client'

interface GetPatientAppointmentsHistoryUseCaseRequest {
  patientId: string
}

interface GetPatientAppointmentsHistoryUseCaseResponse {
  appointments: Appointment[]
}

export class GetPatientAppointmentsHistoryUseCase {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute({
    patientId,
  }: GetPatientAppointmentsHistoryUseCaseRequest): Promise<GetPatientAppointmentsHistoryUseCaseResponse> {
    const appointments =
      await this.appointmentsRepository.findManyAppointmentsByPatientId(
        patientId,
      )
    return {
      appointments,
    }
  }
}
