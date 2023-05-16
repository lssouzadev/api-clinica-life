import { app } from '@/app'
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

  it('should be able to create a treatment', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/treatments')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'extraction',
        priceTreatment: '25,00',
        costTreatment: '10,00',
      })

    expect(response.statusCode).toEqual(201)
  })
})
