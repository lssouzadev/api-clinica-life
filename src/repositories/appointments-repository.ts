import { Prisma, Appointment } from '@prisma/client'

export interface AppointmentsRepository {
  create(data: Prisma.AppointmentUncheckedCreateInput): Promise<Appointment>
  findAppointmentByRoomIdAndDateHour(
    dateHour: Date,
    roomId: string,
  ): Promise<Appointment | null>
  findAppointmentByProfessionalIdAndDate(
    professionalId: string,
    date: Date,
  ): Promise<Appointment | null>
  findManyAppointmentsByProfessionalIdAndDate(
    professionalId: string,
    date: Date,
  ): Promise<Appointment[]>
  deleteAppointment(appointmentId: string): Promise<void>
  findManyAppointmentsByDate(date: Date): Promise<Appointment[]>
  findManyAppointmentsByPatientId(patientId: string): Promise<Appointment[]>
  findManyAppointmentsByRoomAndDate(
    roomId: string,
    date: Date,
  ): Promise<Appointment[]>
}
