import { makeFetchAppointmentsByRoomAndDateUseCase } from '@/use-cases/@factories/make-fetch-appointments-by-room-and-date-use-case'
import dayjs from 'dayjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchManyByRoomAndDate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchByRoomAndDateParamsSchema = z.object({
    roomId: z.string(),
  })

  const fetchByRoomAndDateQuerySchema = z.object({
    date: z.string(),
  })

  const { roomId } = fetchByRoomAndDateParamsSchema.parse(request.params)
  console.log('passei aqui 1')
  const { date } = fetchByRoomAndDateQuerySchema.parse(request.query)

  console.log('passei aqui')

  const dateFormat = dayjs.utc(date).toDate()

  const fetchAppointmentsByRoomAndDateUseCase =
    makeFetchAppointmentsByRoomAndDateUseCase()

  const { appointments } = await fetchAppointmentsByRoomAndDateUseCase.execute({
    roomId,
    date: dateFormat,
  })

  return reply.status(200).send({
    appointments,
  })
}
