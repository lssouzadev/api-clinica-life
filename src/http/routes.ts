import { FastifyInstance } from 'fastify'
import { registerClinic } from './controllers/clinic/register-clinic'
import { registerProfessional } from './controllers/professionals/register-professional'
import { appointment } from './controllers/appointments/register-appointment'
import { getByProfessional } from './controllers/appointments/getByProfessional'

export async function appRoutes(app: FastifyInstance) {
  app.post('/clinics', registerClinic)
  app.post('/professionals', registerProfessional)

  app.post('/appointment', appointment)

  app.get('/appointment/get', getByProfessional)
}
