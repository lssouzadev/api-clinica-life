import { InvalidCredentialsError } from '@/use-cases/@errors/invalid-credentials-error'
import { makeAuthenticateProfessionalUseCase } from '@/use-cases/@factories/make-authenticate-professional-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string(),
    password: z.string(),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateProfessionalUseCase =
      makeAuthenticateProfessionalUseCase()

    const { professional } = await authenticateProfessionalUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: professional.id,
        },
      },
    )

    return reply.status(200).send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
