import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function professionalRoomRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/room/:roomId/professional', create)
}
