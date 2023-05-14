import { FastifyInstance } from 'fastify'
import { registerClinic } from './register-clinic'

export async function clinicRoutes(app: FastifyInstance) {
  app.post('/clinics', registerClinic)
}
