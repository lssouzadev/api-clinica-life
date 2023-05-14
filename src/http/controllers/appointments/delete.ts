import { MakeDeleteAppointmentUseCase } from '@/use-cases/@factories/make-delete-appointment-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteAppointment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteAppointmentParamsSchema = z.object({
    appointmentId: z.string().uuid(),
  })

  const { appointmentId } = deleteAppointmentParamsSchema.parse(request.params)

  const deleteAppointmentUseCase = MakeDeleteAppointmentUseCase()

  await deleteAppointmentUseCase.execute({
    appointmentId,
  })

  return reply.status(200).send()
}
