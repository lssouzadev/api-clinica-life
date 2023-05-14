import { makeCreateTreatmentUseCase } from '@/use-cases/@factories/make-create-treatment-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    title: z.string(),
    priceTreatment: z.string(),
    costTreatment: z.string(),
  })

  const { title, priceTreatment, costTreatment } = createBodySchema.parse(
    request.body,
  )

  const createTreatmentUseCase = makeCreateTreatmentUseCase()

  createTreatmentUseCase.execute({
    title,
    priceTreatment,
    costTreatment,
  })

  return reply.status(201).send()
}
