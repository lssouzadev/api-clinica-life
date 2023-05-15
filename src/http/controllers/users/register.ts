import { IncorrectTypeError } from '@/use-cases/@errors/incorrect-type-error'
import { PatientNotFoundError } from '@/use-cases/@errors/patient-not-found-error'
import { ProfessionalNotFoundError } from '@/use-cases/@errors/professional-not-found-error'
import { UserAlreadyExistsError } from '@/use-cases/@errors/user-already-exists-error'
import { makeRegisterUserUseCase } from '@/use-cases/@factories/make-register-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerUserBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6),
    type: z.string(),
    professionalId: z.string().nullable(),
    patientId: z.string().nullable(),
  })

  const { name, email, password, type, professionalId, patientId } =
    registerUserBodySchema.parse(request.body)

  try {
    const usersRepository = makeRegisterUserUseCase()

    await usersRepository.execute({
      username: name,
      email,
      password,
      type,
      professionalId,
      patientId,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(400).send({ message: err.message })
    }
    if (err instanceof IncorrectTypeError) {
      return reply.status(400).send({ message: err.message })
    }
    if (err instanceof ProfessionalNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }
    if (err instanceof PatientNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
