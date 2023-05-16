import { makeGetPatientAppointmentsHistoryUseCase } from '@/use-cases/@factories/make-get-patient-appointments-history-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function patientHistory(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const patientHistoryParamsSchema = z.object({
    patientId: z.string().uuid(),
  })

  const { patientId } = patientHistoryParamsSchema.parse(request.params)

  const getPatientAppointmentsHistoryUseCase =
    makeGetPatientAppointmentsHistoryUseCase()

  const { appointments } = await getPatientAppointmentsHistoryUseCase.execute({
    patientId,
  })

  return reply.status(200).send({
    appointments,
  })
}
