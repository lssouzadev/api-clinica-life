import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Delete (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('should be able to delete a treatment', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const treatment = await prisma.treatment.create({
      data: {
        title: 'extraction',
        price_treatment: '25,00',
        cost_treatment: '10,00',
      },
    })

    const response = await request(app.server)
      .post(`/treatments/${treatment.id}/delete`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
  })
})
