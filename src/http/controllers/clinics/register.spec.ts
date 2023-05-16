import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('should be able to register a clinic', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/clinics')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Doe',
        address: 'Route 01',
        phone: '1199999999',
      })

    expect(response.statusCode).toEqual(201)
  })
})
