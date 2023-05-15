import { makeGetProfessionalProfileUseCase } from '@/use-cases/@factories/make-get-professional-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getProfessionalProfileUseCase = makeGetProfessionalProfileUseCase()

  const { professional } = getProfessionalProfileUseCase.execute({
    professionalId: request.user.sub,
  })

  return reply.status(200).send({
    professional: {
      ...professional,
      password_hash: undefined,
    },
  })
}
