import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Treatment (e2e)', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to create Treatment', async () => {
    const { token, professional } = await createAndAuthenticateUser(app)

    const patient = await prisma.patient.create({
      data: {
        name: 'Richard Doe',
        cpf: '00100200305',
        phone: '1199999999',
        birthday: '19920510',
      },
    })

    const procedure = await prisma.procedure.create({
      data: {
        title: 'Extraction',
        cost_procedure: '20,00',
        price_procedure: '50,00',
      },
    })

    const response = await request(app.server)
      .post(`/patient/${patient.id}/treatment`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        procedureId: procedure.id,
        professionalId: professional.id,
      })

    expect(response.statusCode).toEqual(201)
  })
})
