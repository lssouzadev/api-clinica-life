import { FastifyInstance } from 'fastify'
import { create } from './create'
import { deleteProcedure } from './delete'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function procedureRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/procedures', create)

  app.post('/procedures/:procedureId/delete', deleteProcedure)
}
