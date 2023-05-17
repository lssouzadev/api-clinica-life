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

  it('should be able to delete a procedure', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const procedure = await prisma.procedure.create({
      data: {
        title: 'extraction',
        price_procedure: '25,00',
        cost_procedure: '10,00',
      },
    })

    const response = await request(app.server)
      .post(`/procedures/${procedure.id}/delete`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
  })
})
