import { makeGetAppointmentsByDateUseCase } from '@/use-cases/@factories/make-get-appointments-by-date-use-case'
import dayjs from 'dayjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getByDate(request: FastifyRequest, reply: FastifyReply) {
  const getByDateBodySchema = z.object({
    date: z.string(),
  })

  const { date } = getByDateBodySchema.parse(request.body)

  const dateFormat = dayjs.utc(date).toDate()

  const getAppointmentsByDateUseCase = makeGetAppointmentsByDateUseCase()

  getAppointmentsByDateUseCase.execute({
    date: dateFormat,
  })

  return reply.status(200).send()
}
