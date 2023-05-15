import { FastifyInstance } from 'fastify'
import { registerProfessional } from './register-professional'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function professionalRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/professionals', registerProfessional)
}
