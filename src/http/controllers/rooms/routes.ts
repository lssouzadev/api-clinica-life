import { FastifyInstance } from 'fastify'
import { create } from './create'

export async function roomRoutes(app: FastifyInstance) {
  app.post('/room', create)
}
