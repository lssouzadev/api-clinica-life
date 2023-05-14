import { makeCreateRoomUseCase } from '@/use-cases/@factories/make-create-room-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    title: z.string(),
  })

  const { title } = createBodySchema.parse(request.body)

  const createRoomUseCase = makeCreateRoomUseCase()

  createRoomUseCase.execute({
    title,
  })
}
