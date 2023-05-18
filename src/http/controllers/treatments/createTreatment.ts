import { makeCreateTreatmentUseCase } from '@/use-cases/@factories/make-create-treatment-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createTreatment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createTreatmentBodySchema = z.object({
    professionalId: z.string(),
    procedureId: z.string(),
  })

  const createTreatmentParamsSchema = z.object({
    patientId: z.string().uuid(),
  })

  const { procedureId, professionalId } = createTreatmentBodySchema.parse(
    request.body,
  )

  const { patientId } = createTreatmentParamsSchema.parse(request.params)

  const createTreatmentUseCase = makeCreateTreatmentUseCase()

  await createTreatmentUseCase.execute({
    patientId,
    procedureId,
    professionalId,
  })

  return reply.status(201).send()
}
