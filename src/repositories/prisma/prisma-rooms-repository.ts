import { Prisma } from '@prisma/client'
import { RoomsRepository } from '../rooms-repository'
import { prisma } from '@/lib/prisma'

export class PrismaRoomsRepository implements RoomsRepository {
  async create(data: Prisma.RoomUncheckedCreateInput) {
    const room = await prisma.room.create({
      data,
    })

    return room
  }
}
