import { InMemoryProfessionalsRepository } from '@/repositories/in-memory/in-memory-professionals-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteProfessionalUseCase } from './delete-professional'
import { hash } from 'bcryptjs'

let professionalsRepository: InMemoryProfessionalsRepository
let sut: DeleteProfessionalUseCase

describe('Delete Professional Use Case', () => {
  beforeEach(() => {
    professionalsRepository = new InMemoryProfessionalsRepository()
    sut = new DeleteProfessionalUseCase(professionalsRepository)
  })

  it('should be able to delete a Professional', async () => {
    await professionalsRepository.create({
      id: 'professional-01',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      cpf: '11122233345',
      specialty: 'cirurgião dentista',
      phone: '1199999999',
      clinic_id: 'clinica-01',
    })

    await professionalsRepository.create({
      id: 'professional-02',
      name: 'Jorge Doe',
      email: 'jorgedoe@example.com',
      password_hash: await hash('123456', 6),
      cpf: '11122233350',
      specialty: 'cirurgião dentista',
      phone: '1199999999',
      clinic_id: 'clinica-01',
    })

    await sut.execute({
      professionalId: 'professional-01',
    })

    expect(professionalsRepository.items).toHaveLength(1)
  })
})
