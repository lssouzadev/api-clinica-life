import { PrismaProfessionalRoomsRepository } from '@/repositories/prisma/prisma-professional-rooms-repository'
import { CreateProfessionalRoomUseCase } from '../professional-room/create-professional-room'

export function makeCreateProfessionalRoomUseCase() {
  const professionalRoomsRepository = new PrismaProfessionalRoomsRepository()
  const createProfessionalRoomUseCase = new CreateProfessionalRoomUseCase(
    professionalRoomsRepository,
  )

  return createProfessionalRoomUseCase
}
