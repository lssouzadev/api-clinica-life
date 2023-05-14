import { PatientAlreadyExistsError } from '@/use-cases/@errors/patient-already-exists-error'
import { makeRegisterPatientUseCase } from '@/use-cases/@factories/make-register-patient-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    cpf: z.string(),
    phone: z.string(),
    birthday: z.string(),
  })

  const { name, cpf, phone, birthday } = registerBodySchema.parse(request.body)

  try {
    const registerPatientUseCase = makeRegisterPatientUseCase()

    await registerPatientUseCase.execute({
      name,
      cpf,
      phone,
      birthday,
    })
  } catch (err) {
    if (err instanceof PatientAlreadyExistsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
