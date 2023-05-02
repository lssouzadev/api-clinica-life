import { makeGetProfessionalAppointmentsUseCase } from '@/use-cases/factories/make-get-professional-appointments-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getByProfessional(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getByProfessionalBodySchema = z.object({
    dateHour: z.string(),
    professionalId: z.string(),
  })

  const { professionalId, dateHour } = getByProfessionalBodySchema.parse(
    request.query,
  )

  const getProfessionalAppointmentsUseCase =
    makeGetProfessionalAppointmentsUseCase()

  const { appointments } = await getProfessionalAppointmentsUseCase.execute({
    date: new Date(dateHour),
    professionalId,
  })

  return reply.status(200).send({
    appointments,
  })
}
