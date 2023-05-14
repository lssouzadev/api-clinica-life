import { makeFetchAppointmentsByRoomAndDateUseCase } from '@/use-cases/@factories/make-fetch-appointments-by-room-and-date-use-case'
import dayjs from 'dayjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchManyByRoomAndDate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchByRoomAndDateParamsSchema = z.object({
    roomId: z.string().uuid(),
  })

  const fetchByRoomAndDateBodySchema = z.object({
    date: z.string().uuid(),
  })

  const { roomId } = fetchByRoomAndDateParamsSchema.parse(request.params)

  const { date } = fetchByRoomAndDateBodySchema.parse(request.body)

  const dateFormat = dayjs.utc(date).toDate()

  const fetchAppointmentsByRoomAndDateUseCase =
    makeFetchAppointmentsByRoomAndDateUseCase()

  fetchAppointmentsByRoomAndDateUseCase.execute({
    roomId,
    date: dateFormat,
  })

  return reply.status(200).send()
}
