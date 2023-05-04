import { AppointmentsRepository } from '@/repositories/appointments-repository'
import { Appointment } from '@prisma/client'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { OutOfOfficeHoursError } from '../@errors/ out-of-office-hours-error'
import { InvalidAppointmentTimeError } from '../@errors/invalid-appointment-time-error'
import { AppointmentAlreadyExistsError } from '../@errors/appointment-already-exists-error'
import { ProfessionalUnavailableError } from '../@errors/professional-unavailable-error'
import { ProfessionalRoomsRepository } from '@/repositories/professional-rooms-repository'
import { ProfessionalNotAllowedError } from '../@errors/professional-not-allowed-error'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('America/Sao_Paulo')

interface AppointmentUseCaseRequest {
  dateHour: Date
  professionalId: string
  patientId: string
  roomId: string
}

interface AppointmentUseCaseResponse {
  appointment: Appointment
}

export class RegisterAppointmentUseCase {
  constructor(
    private appointmentsRepository: AppointmentsRepository,
    private professionalRoomsRepository: ProfessionalRoomsRepository,
  ) {}

  async execute({
    dateHour,
    professionalId,
    patientId,
    roomId,
  }: AppointmentUseCaseRequest): Promise<AppointmentUseCaseResponse> {
    const professionalRoomVerification =
      await this.professionalRoomsRepository.findByProfessionalIdAndRoomId(
        professionalId,
        roomId,
      )

    if (!professionalRoomVerification) {
      throw new ProfessionalNotAllowedError()
    }
    const startOfDay = dayjs.utc(dateHour).set('hour', 7).set('minute', 0)
    const endOfDay = dayjs.utc(dateHour).set('hour', 21).set('minute', 0)

    const dateHourFns = dayjs.utc(dateHour)

    if (dateHourFns.minute() !== 0) {
      if (dateHourFns.minute() !== 30) {
        throw new InvalidAppointmentTimeError()
      }
    }

    if (dateHourFns.isBefore(startOfDay || dateHourFns.isAfter(endOfDay))) {
      throw new OutOfOfficeHoursError()
    }

    const professionalAppointments =
      await this.appointmentsRepository.findAppointmentsByProfessionalIdAndDate(
        professionalId,
        dateHour,
      )

    if (professionalAppointments) {
      throw new ProfessionalUnavailableError()
    }

    const appointmentSameRoomAndDateHour =
      await this.appointmentsRepository.findAppointmentByRoomIdAndDateHour(
        dateHour,
        roomId,
      )

    if (appointmentSameRoomAndDateHour) {
      throw new AppointmentAlreadyExistsError()
    }

    const appointment = await this.appointmentsRepository.create({
      date_hour: dateHour,
      professional_id: professionalId,
      patient_id: patientId,
      room_id: roomId,
    })

    return {
      appointment,
    }
  }
}
