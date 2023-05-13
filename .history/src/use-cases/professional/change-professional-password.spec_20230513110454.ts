import { InMemoryProfessionalsRepository } from '@/repositories/in-memory/in-memory-professionals-repository'
import { ChangeProfessionalPasswordUseCase } from './change-professional-password'
import { beforeEach, describe, it } from 'vitest'
import { hash } from 'bcryptjs'

let professionalsRepository: InMemoryProfessionalsRepository
let sut: ChangeProfessionalPasswordUseCase

describe('Change Professional Password Use Case', () => {
  beforeEach(() => {
    professionalsRepository = new InMemoryProfessionalsRepository()
    sut = new ChangeProfessionalPasswordUseCase(professionalsRepository)
  })

  it('should be able to change a professional password', async () => {
    await professionalsRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      cpf: '00100200304',
      specialty: 'specialty-01',
      phone: '1199999999',
      clinic_id: 'clinic-01',
    })
  })
})
