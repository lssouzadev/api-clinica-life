import { FastifyInstance } from 'fastify'
import { createTreatment } from './createTreatment'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function treatmentRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/patient/:patientId/treatment', createTreatment)
}
