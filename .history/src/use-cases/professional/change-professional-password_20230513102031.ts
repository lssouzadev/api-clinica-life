import { Professional } from '@prisma/client'

interface ChangeProfessionalPasswordUseCaseRequest {
  professionalId: string
  oldPassword: string
  newPassword: string
}

interface ChangeProfessionalPasswordUseCaseResponse {
  professional: Professional
}
