import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { RegisterUserUseCase } from './register-user'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserAlreadyExistsError } from '../@errors/user-already-exists-error'
import { IncorrectTypeError } from '../@errors/incorrect-type-error'
import { ProfessionalNotFoundError } from '../@errors/professional-not-found-error'
import { PatientNotFoundError } from '../@errors/patient-not-found-error'
import { InMemoryProfessionalsRepository } from '@/repositories/in-memory/in-memory-professionals-repository'
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository'

let patientsRepository: InMemoryPatientsRepository
let professionalsRepository: InMemoryProfessionalsRepository
let usersRepository: InMemoryUsersRepository
let sut: RegisterUserUseCase

describe('Register User Use Case', () => {
  beforeEach(() => {
    patientsRepository = new InMemoryPatientsRepository()
    professionalsRepository = new InMemoryProfessionalsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserUseCase(
      usersRepository,
      professionalsRepository,
      patientsRepository,
    )
  })

  it('should be able to register an user', async () => {
    const { user } = await sut.execute({
      username: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      type: 'professional',
      professionalId: 'prof-01',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to register an user with same email', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      username: 'John Doe',
      email,
      password: '123456',
      type: 'professional',
      professionalId: 'prof-01',
    })

    await expect(() =>
      sut.execute({
        username: 'John Doe',
        email,
        password: '123456',
        type: 'professional',
        professionalId: 'prof-01',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should not be possible to register a user with the different type of professional and patient', async () => {
    await expect(() =>
      sut.execute({
        username: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        type: 'wrong-type',
        professionalId: 'prof-01',
      }),
    ).rejects.toBeInstanceOf(IncorrectTypeError)
  })

  it('should not be possible to register a user with type professional passing a patient id', async () => {
    await expect(() =>
      sut.execute({
        username: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        type: 'professional',
        patientId: 'pat-01',
      }),
    ).rejects.toBeInstanceOf(ProfessionalNotFoundError)
  })

  it('should not be possible to register a user with type patient passing a professional id', async () => {
    await expect(() =>
      sut.execute({
        username: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        type: 'patient',
        professionalId: 'prof-01',
      }),
    ).rejects.toBeInstanceOf(PatientNotFoundError)
  })
})
