import fastify from 'fastify'
import { clinicRoutes } from './http/controllers/clinics/routes'
import { ZodError } from 'zod'
import { professionalRoutes } from './http/controllers/professionals/routes'
import { appointmentRoutes } from './http/controllers/appointments/routes'

export const app = fastify()

app.register(clinicRoutes)
app.register(professionalRoutes)
app.register(appointmentRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  return reply.status(500).send({ message: 'Internal Server Error.' })
})
