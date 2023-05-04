import { makeRegisterAppointmentUseCase } from '@/use-cases/@factories/make-register-appointment-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { AppointmentAlreadyExistsError } from '@/use-cases/@errors/appointment-already-exists-error'
import { OutOfOfficeHoursError } from '@/use-cases/@errors/ out-of-office-hours-error'
import { InvalidAppointmentTimeError } from '@/use-cases/@errors/invalid-appointment-time-error'

export async function appointment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
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
    if (err instanceof AppointmentAlreadyExistsError) {
      return reply.status(400).send({ message: err.message })
    }

    if (err instanceof OutOfOfficeHoursError) {
      return reply.status(400).send({ message: err.message })
    }

    if (err instanceof InvalidAppointmentTimeError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send()
}
