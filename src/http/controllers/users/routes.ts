import { FastifyInstance } from 'fastify'
import { register } from './register'
import { profile } from './profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { authenticate } from './authenticate'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
