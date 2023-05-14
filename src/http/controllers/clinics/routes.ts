import { FastifyInstance } from 'fastify'
import { register } from './register'

export async function clinicRoutes(app: FastifyInstance) {
  app.post('/clinics', register)
}
