import { Prisma, ProfessionalRoom } from '@prisma/client'

export interface ProfessionalRoomsRepository {
  create(
    data: Prisma.ProfessionalRoomUncheckedCreateInput,
  ): Promise<ProfessionalRoom>
  findByProfessionalIdAndRoomId(
    professionalId: string,
    roomId: string,
  ): Promise<ProfessionalRoom | null>
}
