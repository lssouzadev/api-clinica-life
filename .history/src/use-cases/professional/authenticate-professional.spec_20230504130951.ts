import { InMemoryProfessionalsRepository } from '@/repositories/in-memory/in-memory-professionals-repository'
import { AuthenticateProfessionalUseCase } from './authenticate-professional'
import { beforeEach, describe, it } from 'vitest'
import { hash } from 'bcryptjs'

let professionalsRepository: InMemoryProfessionalsRepository
let sut: AuthenticateProfessionalUseCase

describe('Authenticate Professional Use Case', () => {
  beforeEach(() => {
    professionalsRepository = new InMemoryProfessionalsRepository()
    sut = new AuthenticateProfessionalUseCase(professionalsRepository)
  })

  it('should be able to authenticate professional', async () => {
    professionalsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      cpf: '00100200304',
      specialty: 'specialty-01',
      phone: '1199999999',
      clinic_id: 'clinic-01',
    })

    await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })
  })
})
