import fastify from 'fastify'
import { clinicRoutes } from './http/controllers/clinics/routes'
import { ZodError } from 'zod'
import { professionalRoutes } from './http/controllers/professionals/routes'
import { appointmentRoutes } from './http/controllers/appointments/routes'
import fastifyJwt from '@fastify/jwt'
import { env } from './env'
import { patientRoutes } from './http/controllers/patients/routes'
import { professionalRoomRoutes } from './http/controllers/professional-rooms/routes'
import { treatmentRoutes } from './http/controllers/treatments/routes'
import { roomRoutes } from './http/controllers/rooms/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(clinicRoutes)
app.register(professionalRoutes)
app.register(appointmentRoutes)
app.register(patientRoutes)
app.register(professionalRoomRoutes)
app.register(treatmentRoutes)
app.register(roomRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  return reply.status(500).send({ message: 'Internal Server Error.' })
})
