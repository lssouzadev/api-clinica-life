import { InMemoryAppointmentsRepository } from '@/repositories/in-memory/in-memory-appointments-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetAppointmentsByDateUseCase } from './get-appointments-by-date'
import dayjs from 'dayjs'

let appointmentsRepository: InMemoryAppointmentsRepository
let sut: GetAppointmentsByDateUseCase

describe('Get Appointments By Date Use Case', () => {
  beforeEach(() => {
    appointmentsRepository = new InMemoryAppointmentsRepository()
    sut = new GetAppointmentsByDateUseCase(appointmentsRepository)
  })

  it('should be able to get appointments by date', async () => {
    await appointmentsRepository.create({
      date_hour: '2023-04-29T07:30:00.000Z',
      professional_id: 'prof-01',
      patient_id: 'patient-01',
      room_id: 'room-01',
    })

    await appointmentsRepository.create({
      date_hour: '2023-04-29T07:30:00.000Z',
      professional_id: 'prof-01',
      patient_id: 'patient-01',
      room_id: 'room-01',
    })

    await appointmentsRepository.create({
      date_hour: '2023-04-29T08:00:00.000Z',
      professional_id: 'prof-01',
      patient_id: 'patient-01',
      room_id: 'room-01',
    })

    const { appointments } = await sut.execute({
      date: dayjs.utc('2023-04-29T05:00:00.000Z').toDate(),
    })

    expect(appointments).toHaveLength(3)
  })
})
