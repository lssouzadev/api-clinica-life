import { Treatment } from '@prisma/client'
interface CreateTreatmentUseCaseRequest {
  title: string
  priceTreatment: string
  professionalId: string
  patientId: string
}

interface CreateTreatmentUseCaseResponse {
  treatment: Treatment
}
