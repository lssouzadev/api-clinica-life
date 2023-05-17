import { makeCreateProcedureUseCase } from '@/use-cases/@factories/make-create-procedure-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    title: z.string(),
    priceProcedure: z.string(),
    costProcedure: z.string(),
  })

  const { title, priceProcedure, costProcedure } = createBodySchema.parse(
    request.body,
  )

  const createProcedureUseCase = makeCreateProcedureUseCase()

  createProcedureUseCase.execute({
    title,
    priceProcedure,
    costProcedure,
  })

  return reply.status(201).send()
}
