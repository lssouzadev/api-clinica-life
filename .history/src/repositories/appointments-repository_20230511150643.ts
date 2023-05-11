import { Prisma, Appointment } from '@prisma/client'

export interface AppointmentsRepository {
  create(data: Prisma.AppointmentUncheckedCreateInput): Promise<Appointment>
  findAppointmentByRoomIdAndDateHour(
    dateHour: Date,
    roomId: string,
  ): Promise<Appointment | null>
  findManyAppointmentsByProfessionalIdAndDate(
    professionalId: string,
    date: Date,
  ): Promise<Appointment[]>
  deleteAppointment(appointmentId: string): Promise<void>
  findAppointmentsByProfessionalIdAndDate(
    professionalId: string,
    date: Date,
  ): Promise<Appointment | null>
  findManyAppointmentsByDate(date: Date): Promise<Appointment[]>
  findManyAppointmentsByPatientId(patientId: string): Promise<Appointment[]>

  fetchAppointmentsByRoom(roomId: string): Promise<Appointment[]>
}
