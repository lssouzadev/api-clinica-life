import { Room } from '@prisma/client'
import { RoomsRepository } from '@/repositories/rooms-repository'

interface CreateRoomUseCaseRequest {
  title: string
}

interface CreateRoomUseCaseResponse {
  room: Room
}

export class CreateRoomUseCase {
  constructor(private roomsRepository: RoomsRepository) {}
  async execute({
    title,
  }: CreateRoomUseCaseRequest): Promise<CreateRoomUseCaseResponse> {
    const room = await this.roomsRepository.create({
      title,
    })

    return {
      room,
    }
  }
}
