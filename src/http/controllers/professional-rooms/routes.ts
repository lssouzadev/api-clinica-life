import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function professionalRoutes(app: FastifyInstance) {
  app.post('/room/:roomId/professional', create)
}
