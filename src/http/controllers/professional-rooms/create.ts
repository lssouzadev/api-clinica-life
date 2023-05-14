import { makeCreateProfessionalRoomUseCase } from '@/use-cases/@factories/make-create-professinal-room-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createParamsSchema = z.object({
    roomId: z.string().uuid(),
  })

  const createBodySchema = z.object({
    professionalId: z.string().uuid(),
  })

  const { roomId } = createParamsSchema.parse(request.params)

  const { professionalId } = createBodySchema.parse(request.body)

  const createProfessionalRoomUseCase = makeCreateProfessionalRoomUseCase()

  createProfessionalRoomUseCase.execute({
    roomId,
    professionalId,
  })

  return reply.status(200).send()
}
