import { makeRegisterAppointmentUseCase } from '@/use-cases/@factories/make-register-appointment-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { AppointmentAlreadyExistsError } from '@/use-cases/@errors/appointment-already-exists-error'
import { OutOfOfficeHoursError } from '@/use-cases/@errors/ out-of-office-hours-error'
import { InvalidAppointmentTimeError } from '@/use-cases/@errors/invalid-appointment-time-error'
import { ProfessionalNotAllowedError } from '@/use-cases/@errors/professional-not-allowed-error'
import { ProfessionalNotFoundError } from '@/use-cases/@errors/professional-not-found-error'
import { PatientNotFoundError } from '@/use-cases/@errors/patient-not-found-error'
import { RoomNotFoundError } from '@/use-cases/@errors/room-not-found-error'
import { ProfessionalUnavailableError } from '@/use-cases/@errors/professional-unavailable-error'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const appointmentBodySchema = z.object({
    dateHour: z.string(),
    professionalId: z.string(),
    patientId: z.string(),
    roomId: z.string(),
  })

  const { dateHour, professionalId, patientId, roomId } =
    appointmentBodySchema.parse(request.body)

  try {
    const registerAppointmentUseCase = makeRegisterAppointmentUseCase()

    await registerAppointmentUseCase.execute({
      dateHour: new Date(dateHour),
      professionalId,
      patientId,
      roomId,
    })
  } catch (err) {
    if (err instanceof ProfessionalNotAllowedError) {
      return reply.status(400).send({ message: err.message })
    }

    if (err instanceof ProfessionalNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    if (err instanceof PatientNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    if (err instanceof RoomNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    if (err instanceof InvalidAppointmentTimeError) {
      return reply.status(400).send({ message: err.message })
    }

    if (err instanceof OutOfOfficeHoursError) {
      return reply.status(400).send({ message: err.message })
    }

    if (err instanceof ProfessionalUnavailableError) {
      return reply.status(400).send({ message: err.message })
    }

    if (err instanceof AppointmentAlreadyExistsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
