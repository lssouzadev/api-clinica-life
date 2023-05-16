import { InMemoryAppointmentsRepository } from '@/repositories/in-memory/in-memory-appointments-repository'
import { RegisterAppointmentUseCase } from './register-appointment'
import { beforeEach, describe, expect, it } from 'vitest'
import { InvalidAppointmentTimeError } from '../@errors/invalid-appointment-time-error'
import { AppointmentAlreadyExistsError } from '../@errors/appointment-already-exists-error'
import { OutOfOfficeHoursError } from '../@errors/ out-of-office-hours-error'
import { ProfessionalUnavailableError } from '../@errors/professional-unavailable-error'
import { InMemoryProfessionalRoomsRepository } from '@/repositories/in-memory/in-memory-professional-rooms-repository'
import { InMemoryProfessionalsRepository } from '@/repositories/in-memory/in-memory-professionals-repository'
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository'
import { InMemoryRoomsRepository } from '@/repositories/in-memory/in-memory-rooms-repository'
let professionalsRepository: InMemoryProfessionalsRepository
let patientsRepository: InMemoryPatientsRepository
let roomsRepository: InMemoryRoomsRepository
let professionalRoomsRepository: InMemoryProfessionalRoomsRepository
let appointmentsRepository: InMemoryAppointmentsRepository
let sut: RegisterAppointmentUseCase

describe('Register Appointment Use Case', () => {
  beforeEach(() => {
    professionalsRepository = new InMemoryProfessionalsRepository()
    professionalRoomsRepository = new InMemoryProfessionalRoomsRepository()
    appointmentsRepository = new InMemoryAppointmentsRepository()
    sut = new RegisterAppointmentUseCase(
      appointmentsRepository,
      professionalRoomsRepository,
      professionalsRepository,
      roomsRepository,
      patientsRepository,
    )
  })

  it('should be able to register appointment', async () => {
    await professionalRoomsRepository.create({
      professional_id: 'professional-01',
      room_id: 'room-01',
    })

    const { appointment } = await sut.execute({
      professionalId: 'professional-01',
      patientId: 'patient-01',
      dateHour: new Date('2023-04-29T07:30:00.000Z'),
      roomId: 'room-01',
    })

    expect(appointment.id).toEqual(expect.any(String))
  })

  it('should not be able to register appointment where the minutes are different from thirty or zero', async () => {
    await professionalRoomsRepository.create({
      professional_id: 'professional-01',
      room_id: 'room-01',
    })

    await expect(() =>
      sut.execute({
        professionalId: 'professional-01',
        patientId: 'patient-01',
        dateHour: new Date('2023-04-29T07:31:00.000Z'),
        roomId: 'room-01',
      }),
    ).rejects.toBeInstanceOf(InvalidAppointmentTimeError)
  })

  it('should not be able to register two appointments in the same room and time', async () => {
    await professionalRoomsRepository.create({
      professional_id: 'professional-01',
      room_id: 'room-01',
    })

    await professionalRoomsRepository.create({
      professional_id: 'professional-02',
      room_id: 'room-01',
    })

    await sut.execute({
      professionalId: 'professional-01',
      patientId: 'patient-01',
      dateHour: new Date('2023-04-29T07:30:00.000Z'),
      roomId: 'room-01',
    })

    await expect(() =>
      sut.execute({
        professionalId: 'professional-02',
        patientId: 'patient-01',
        dateHour: new Date('2023-04-29T07:30:00.000Z'),
        roomId: 'room-01',
      }),
    ).rejects.toBeInstanceOf(AppointmentAlreadyExistsError)
  })

  it('should be able to register two appointments in different room but equal time', async () => {
    await professionalRoomsRepository.create({
      professional_id: 'professional-01',
      room_id: 'room-01',
    })

    await professionalRoomsRepository.create({
      professional_id: 'professional-02',
      room_id: 'room-02',
    })

    await sut.execute({
      professionalId: 'professional-01',
      patientId: 'patient-01',
      dateHour: new Date('2023-04-29T07:30:00.000Z'),
      roomId: 'room-01',
    })

    const { appointment } = await sut.execute({
      professionalId: 'professional-02',
      patientId: 'patient-01',
      dateHour: new Date('2023-04-29T07:30:00.000Z'),
      roomId: 'room-02',
    })

    expect(appointment.id).toEqual(expect.any(String))
  })

  it('should not be able to register two appointments at the same time for a single professional', async () => {
    await professionalRoomsRepository.create({
      professional_id: 'professional-01',
      room_id: 'room-01',
    })

    await professionalRoomsRepository.create({
      professional_id: 'professional-01',
      room_id: 'room-02',
    })

    await sut.execute({
      professionalId: 'professional-01',
      patientId: 'patient-01',
      dateHour: new Date('2023-04-29T07:30:00.000Z'),
      roomId: 'room-01',
    })

    await expect(() =>
      sut.execute({
        professionalId: 'professional-01',
        patientId: 'patient-01',
        dateHour: new Date('2023-04-29T07:30:00.000Z'),
        roomId: 'room-02',
      }),
    ).rejects.toBeInstanceOf(ProfessionalUnavailableError)
  })

  it('should not to register appointments outside working hours', async () => {
    await professionalRoomsRepository.create({
      professional_id: 'professional-01',
      room_id: 'room-01',
    })

    await expect(() =>
      sut.execute({
        professionalId: 'professional-01',
        patientId: 'patient-01',
        dateHour: new Date('2023-04-29T06:30:00.000Z'),
        roomId: 'room-01',
      }),
    ).rejects.toBeInstanceOf(OutOfOfficeHoursError)
  })
})
