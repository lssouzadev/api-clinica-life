import { FastifyInstance } from 'fastify'
import { register } from './register'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function clinicRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/clinics', register)
}
