import { FastifyInstance } from 'fastify'
import { registerProfessional } from './register-professional'

export async function professionalRoutes(app: FastifyInstance) {
  app.post('/professionals', registerProfessional)
}
