import { Prisma, ProfessionalRoom } from '@prisma/client'
import { ProfessionalRoomsRepository } from '../professional-rooms-repository'
import { prisma } from '@/lib/prisma'

export class PrismaProfessionalRoomsRepository
  implements ProfessionalRoomsRepository
{
  async create(data: Prisma.ProfessionalRoomUncheckedCreateInput) {
    const professionalRoom = await prisma.professionalRoom.create({
      data,
    })

    return professionalRoom
  }

  async findByProfessionalIdAndRoomId(
    professionalId: string,
    roomId: string,
  ): Promise<ProfessionalRoom | null> {
    const professionalRoom = prisma.professionalRoom.findFirst({
      where: {
        AND: [
          {
            professional_id: professionalId,
          },
          {
            room_id: roomId,
          },
        ],
      },
    })

    if (!professionalRoom) {
      return null
    }

    return professionalRoom
  }
}
