import { FastifyInstance } from 'fastify'
import { create } from './create'
import { deleteTreatment } from './delete'

export async function treatmentRoutes(app: FastifyInstance) {
  app.post('/treatment', create)

  app.post('/treatment/:treatmentId/delete', deleteTreatment)
}
