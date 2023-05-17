import { makeDeleteProcedureUseCase } from '@/use-cases/@factories/make-delete-procedure-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteProcedure(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteProcedureParamsSchema = z.object({
    procedureId: z.string(),
  })

  const { procedureId } = deleteProcedureParamsSchema.parse(request.params)

  const deleteProcedureUseCase = makeDeleteProcedureUseCase()

  await deleteProcedureUseCase.execute({
    procedureId,
  })

  return reply.status(200).send()
}
