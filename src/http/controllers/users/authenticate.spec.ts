import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    const clinic = await prisma.clinic.create({
      data: {
        name: 'Clinic Test',
        address: 'Route one',
        phone: '1199999999',
      },
    })

    const professional = await prisma.professional.create({
      data: {
        name: 'Jane Doe',
        cpf: '00100200304',
        specialty: 'dentist',
        phone: '1199999999',
        clinic_id: clinic.id,
      },
    })
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      type: 'professional',
      professionalId: professional.id,
      patientId: null,
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
