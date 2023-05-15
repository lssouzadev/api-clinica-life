import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function roomRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/room', create)
}
