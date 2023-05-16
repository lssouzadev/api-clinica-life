import { makeGetAppointmentsByDateUseCase } from '@/use-cases/@factories/make-get-appointments-by-date-use-case'
import dayjs from 'dayjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getByDate(request: FastifyRequest, reply: FastifyReply) {
  const getByDateQuerySchema = z.object({
    date: z.string(),
  })

  const { date } = getByDateQuerySchema.parse(request.query)

  const dateFormat = dayjs.utc(date).toDate()

  const getAppointmentsByDateUseCase = makeGetAppointmentsByDateUseCase()

  const { appointments } = await getAppointmentsByDateUseCase.execute({
    date: dateFormat,
  })

  return reply.status(200).send({
    appointments,
  })
}
