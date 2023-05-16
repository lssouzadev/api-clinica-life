import { FastifyInstance } from 'fastify'
import { create } from './create'
import { getByProfessional } from './getByProfessional'
import { deleteAppointment } from './delete'
import { patientHistory } from './patient-history'
import { getByDate } from './get-by-date'
import { fetchManyByRoomAndDate } from './fetch-many-by-room-and-date'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function appointmentRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/appointments', create)

  app.post('/appointments/:appointmentId/delete', deleteAppointment)

  app.get('/professionals/:professionalId/appointments', getByProfessional)

  app.get('/patients/:patientId/appointments', patientHistory)

  app.get('/appointments/get', getByDate)

  app.get('/rooms/appointments', fetchManyByRoomAndDate)
}
