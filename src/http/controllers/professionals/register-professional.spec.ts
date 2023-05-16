import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('should be able to create a professional', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const clinic = await prisma.clinic.create({
      data: {
        name: 'Clinic Test',
        address: 'Route one',
        phone: '1199999999',
      },
    })

    const response = await request(app.server)
      .post('/professionals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Doe',
        cpf: '00000000001',
        specialty: 'Cirurgião',
        phone: '1199999999',
        clinicId: clinic.id,
      })

    expect(response.statusCode).toEqual(201)
  })
})
