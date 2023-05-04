import { Patient } from '@prisma/client'
import { PatientsRepository } from '@/repositories/patients-repository'
import { PatientAlreadyExistsError } from '../@errors/patient-already-exists-error'

interface RegisterPatientUseCaseRequest {
  name: string
  cpf: string
  phone: string
  birthday: string
}

interface RegisterPatientUseCaseResponse {
  patient: Patient
}

export class RegisterPatientUseCase {
  constructor(private patientsRepository: PatientsRepository) {}

  async execute({
    name,
    cpf,
    phone,
    birthday,
  }: RegisterPatientUseCaseRequest): Promise<RegisterPatientUseCaseResponse> {
    const patientWithSameCpf = await this.patientsRepository.findByDocument(cpf)

    if (patientWithSameCpf) {
      throw new PatientAlreadyExistsError()
    }

    const patient = await this.patientsRepository.create({
      name,
      cpf,
      phone,
      birthday,
    })

    return {
      patient,
    }
  }
}
