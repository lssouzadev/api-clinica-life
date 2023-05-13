import { InMemoryProfessionalsRepository } from '@/repositories/in-memory/in-memory-professionals-repository'
import { ChangeProfessionalPasswordUseCase } from './change-professional-password'
import { beforeEach, describe, expect, it } from 'vitest'
import { compare, hash } from 'bcryptjs'

let professionalsRepository: InMemoryProfessionalsRepository
let sut: ChangeProfessionalPasswordUseCase

describe('Change Professional Password Use Case', () => {
  beforeEach(() => {
    professionalsRepository = new InMemoryProfessionalsRepository()
    sut = new ChangeProfessionalPasswordUseCase(professionalsRepository)
  })

  it('should be able to change a professional password', async () => {
    await professionalsRepository.create({
      id: 'id-01',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      cpf: '00100200304',
      specialty: 'specialty-01',
      phone: '1199999999',
      clinic_id: 'clinic-01',
    })

    const newPassword = '12345678'

    const { professional } = await sut.execute({
      professionalId: 'id-01',
      oldPassword: '123456',
      newPassword,
    })

    const isCorrectlyPasswordMatches = await compare(
      newPassword,
      professional.password_hash,
    )

    console.log(isCorrectlyPasswordMatches)

    expect(isCorrectlyPasswordMatches).toEqual(true)
  })
})
