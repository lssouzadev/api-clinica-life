import { AppointmentsRepository } from '@/repositories/appointments-repository'

interface DeleteAppointmentUseCaseRequest {
  appointmentId: string
}

export class DeleteAppointmentUseCase {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute({ appointmentId }: DeleteAppointmentUseCaseRequest) {
    this.appointmentsRepository.deleteAppointment(appointmentId)
  }
}
