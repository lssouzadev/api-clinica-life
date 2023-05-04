import { InMemoryProfessionalsRepository } from '@/repositories/in-memory/in-memory-professionals-repository'
import { RegisterProfessionalUseCase } from './register-professional'
import { beforeEach, describe, expect, it } from 'vitest'
import { ProfessionalAlreadyExistsError } from '../@errors/professional-already-exists-error'

let professionalsRepository: InMemoryProfessionalsRepository
let sut: RegisterProfessionalUseCase

describe('Register Professional Use Case', () => {
  beforeEach(() => {
    professionalsRepository = new InMemoryProfessionalsRepository()
    sut = new RegisterProfessionalUseCase(professionalsRepository)
  })

  it('should be able to register a Professional', async () => {
    const { professional } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '11122233345',
      specialty: 'cirurgião dentista',
      phone: '1199999999',
      clinicId: 'clinica-01',
    })

    expect(professional.id).toEqual(expect.any(String))
  })

  it('should not be able to register a professional with same cpf twice', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      cpf: '11122233345',
      specialty: 'cirurgião dentista',
      phone: '1199999999',
      clinicId: 'clinica-01',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        cpf: '11122233345',
        specialty: 'cirurgião dentista',
        phone: '1199999999',
        clinicId: 'clinica-01',
      }),
    ).rejects.toBeInstanceOf(ProfessionalAlreadyExistsError)
  })
})
