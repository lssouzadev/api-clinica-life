import { Prisma, Room } from '@prisma/client'
import { RoomsRepository } from '../rooms-repository'
import { randomUUID } from 'crypto'

export class InMemoryRoomsRepository implements RoomsRepository {
  public items: Room[] = []
  async create(data: Prisma.RoomUncheckedCreateInput) {
    const room = {
      id: data.id ?? randomUUID(),
      title: data.title,
    }

    this.items.push(room)

    return room
  }

  async findById(id: string) {
    const room = this.items.find((item) => item.id === id)

    if (!room) {
      return null
    }

    return room
  }
}
