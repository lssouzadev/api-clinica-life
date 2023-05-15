import { InMemoryProfessionalsRepository } from '@/repositories/in-memory/in-memory-professionals-repository'
import { GetProfessionalProfileUseCase } from './get-professional-profile'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { ProfessionalNotFoundError } from '../@errors/professional-not-found-error'

let professionalsRepository: InMemoryProfessionalsRepository
let sut: GetProfessionalProfileUseCase

describe('Get Professional Profile Use Case', () => {
  beforeEach(() => {
    professionalsRepository = new InMemoryProfessionalsRepository()
    sut = new GetProfessionalProfileUseCase(professionalsRepository)
  })

  it('should be able to get professional profile', async () => {
    const createdProfessional = await professionalsRepository.create({
      id: 'id-01',
      name: 'John Doe',
      email: 'johndoe@example.com',
      cpf: '00100200304',
      password_hash: await hash('123456', 6),
      phone: '1199999999',
      clinic_id: 'clinic-01',
      specialty: 'dentista',
    })

    const { professional } = await sut.execute({
      professionalId: createdProfessional.id,
    })

    expect(professional.name).toEqual('John Doe')
  })

  it('should not be able to get professional profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        professionalId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ProfessionalNotFoundError)
  })
})
