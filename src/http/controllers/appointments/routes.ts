import { FastifyInstance } from 'fastify'
import { register } from './register'
import { getByProfessional } from './getByProfessional'
import { deleteAppointment } from './delete'
import { patientHistory } from './patient-history'
import { getByDate } from './get-by-date'
import { fetchManyByRoomAndDate } from './fetch-many-by-room-and-date'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function appointmentRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/appointment', register)

  app.post('/appointment/:appointmentId/delete', deleteAppointment)

  app.get('/professional/:professionalId/appointments', getByProfessional)

  app.get('/patient/:patientId/appointments', patientHistory)

  app.get('/appointment/get', getByDate)

  app.get('/room/appointments', fetchManyByRoomAndDate)
}