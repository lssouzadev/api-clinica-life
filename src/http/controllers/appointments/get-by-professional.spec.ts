import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get By Professional (e2e)', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to get appointments by Professional ID', async () => {
    const { token, professional } = await createAndAuthenticateUser(app)

    const patient = await prisma.patient.create({
      data: {
        name: 'Richard Doe',
        cpf: '00100200305',
        phone: '1199999999',
        birthday: '19920510',
      },
    })

    const room = await prisma.room.create({
      data: {
        title: 'sala 01',
      },
    })

    await prisma.professionalRoom.create({
      data: {
        professional_id: professional.id,
        room_id: room.id,
      },
    })

    await prisma.appointment.create({
      data: {
        date_hour: '2023-04-29T07:30:00.000Z',
        professional_id: professional.id,
        patient_id: patient.id,
        room_id: room.id,
      },
    })

    await prisma.appointment.create({
      data: {
        date_hour: '2023-04-29T07:00:00.000Z',
        professional_id: professional.id,
        patient_id: patient.id,
        room_id: room.id,
      },
    })

    const response = await request(app.server)
      .get(`/professionals/${professional.id}/appointments`)
      .query({
        date: '2023-04-29T05:00:00.000Z',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
  })
})
