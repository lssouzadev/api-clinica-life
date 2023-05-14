import { makeDeleteTreatmentUseCase } from '@/use-cases/@factories/make-delete-treatment-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteTreatment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteTreatmentParamsSchema = z.object({
    treatmentId: z.string().uuid(),
  })

  const { treatmentId } = deleteTreatmentParamsSchema.parse(request.params)

  const deleteTreatmentUseCase = makeDeleteTreatmentUseCase()

  await deleteTreatmentUseCase.execute({
    treatmentId,
  })

  return reply.status(200).send()
}
