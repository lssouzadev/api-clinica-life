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

  it('should be able to register a patient', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/patients')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Doe',
        cpf: '00100200304',
        phone: '1199999999',
        birthday: '19910410',
      })

    expect(response.statusCode).toEqual(201)
  })
})
