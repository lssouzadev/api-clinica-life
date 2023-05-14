import { PrismaRoomsRepository } from '@/repositories/prisma/prisma-rooms-repository'
import { CreateRoomUseCase } from '../room/create-room'

export function makeCreateRoomUseCase() {
  const roomsRepository = new PrismaRoomsRepository()
  const createRoomUseCase = new CreateRoomUseCase(roomsRepository)

  return createRoomUseCase
}
