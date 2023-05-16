import { makeGetProfessionalAppointmentsUseCase } from '@/use-cases/@factories/make-get-professional-appointments-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getByProfessional(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getByProfessionalParamsSchema = z.object({
    professionalId: z.string(),
  })

  const getByProfessionalQuerySchema = z.object({
    date: z.string(),
  })

  const { professionalId } = getByProfessionalParamsSchema.parse(request.params)

  const { date } = getByProfessionalQuerySchema.parse(request.query)

  const getProfessionalAppointmentsUseCase =
    makeGetProfessionalAppointmentsUseCase()

  const { appointments } = await getProfessionalAppointmentsUseCase.execute({
    date: new Date(date),
    professionalId,
  })

  return reply.status(200).send({
    appointments,
  })
}
