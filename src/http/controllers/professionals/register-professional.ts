import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterProfessionalUseCase } from '../../use-cases/factories/make-register-professional-use-case'

export async function registerProfessional(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerProfessionalBodySchema = z.object({
    name: z.string(),
    specialty: z.string(),
    phone: z.string(),
    clinicId: z.string(),
  })

  const { name, specialty, phone, clinicId } =
    registerProfessionalBodySchema.parse(request.body)

  try {
    const registerProfessionalUseCase = makeRegisterProfessionalUseCase()

    await registerProfessionalUseCase.execute({
      name,
      specialty,
      phone,
      clinicId,
    })
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
