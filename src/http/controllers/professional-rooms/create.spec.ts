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

  it('should be able to link a professional to a room', async () => {
    const { token, professional } = await createAndAuthenticateUser(app)

    const room = await prisma.room.create({
      data: {
        title: 'sala-01',
      },
    })

    const response = await request(app.server)
      .post(`/room/${room.id}/professional`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        professionalId: professional.id,
      })

    expect(response.statusCode).toEqual(201)
  })
})
