interface CreateTreatmentUseCaseRequest {
  title: string
  priceTreatment: string
  professionalId: string
  patientId: string
}

inteface CreateTreatmentUseCaseResponse {
  treatment: Treatment
}
