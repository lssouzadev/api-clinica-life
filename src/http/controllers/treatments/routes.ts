import { FastifyInstance } from 'fastify'
import { create } from './create'
import { deleteTreatment } from './delete'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function treatmentRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/treatment', create)

  app.post('/treatment/:treatmentId/delete', deleteTreatment)
}
