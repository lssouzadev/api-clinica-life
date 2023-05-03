import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterClinicUseCase } from '@/use-cases/factories/make-register-clinic-use-case'

export async function registerClinic(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerClinicBodySchema = z.object({
    name: z.string(),
    address: z.string(),
    phone: z.string(),
  })

  const { name, address, phone } = registerClinicBodySchema.parse(request.body)

  try {
    const registerClinicUseCase = makeRegisterClinicUseCase()

    await registerClinicUseCase.execute({
      name,
      address,
      phone,
    })
  } catch (err) {
    return reply.status(400).send()
  }

  return reply.status(201).send()
}
