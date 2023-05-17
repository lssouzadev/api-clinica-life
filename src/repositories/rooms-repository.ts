import { Prisma, Room } from '@prisma/client'

export interface RoomsRepository {
  create(data: Prisma.RoomCreateInput): Promise<Room>
  findById(id: string): Promise<Room | null>
}
