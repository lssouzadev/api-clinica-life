import { Prisma, Room } from '@prisma/client'

export interface RoomsRepository {
  create(data: Prisma.RoomUncheckedCreateInput): Promise<Room>
}
