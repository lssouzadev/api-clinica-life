import { InMemoryAppointmentsRepository } from '@/repositories/in-memory/in-memory-appointments-repository'
import { FetchAppointmentsByRoomUseCase } from './fetch-appointments-by-room'
import { beforeEach, describe } from 'vitest'

let appointmentsRepository: InMemoryAppointmentsRepository
let sut: FetchAppointmentsByRoomUseCase

describe('Fetch Appointments by Room', () => {
  beforeEach(() => {
    appointmentsRepository = new InMemoryAppointmentsRepository()
    sut = new FetchAppointmentsByRoomUseCase(appointmentsRepository)
  })
})
