import { InMemoryTreatmentsRepository } from '@/repositories/in-memory/in-memory-treatments-repository'
import { DeleteTreatmentUseCase } from './delete-treatment'
import { beforeEach, describe, it } from 'vitest'

let treatmentsRepository: InMemoryTreatmentsRepository
let sut: DeleteTreatmentUseCase

describe('Delete Treatment Use Case', () => {
  beforeEach(() => {
    treatmentsRepository = new InMemoryTreatmentsRepository()
    sut = new DeleteTreatmentUseCase(treatmentsRepository)
  })

  it('should be able to delete a treatment', async () => {
    await treatmentsRepository.create({
      id: 't-01',
      title: 'treatment',
      cost_treatment: '10,00',
      price_treatment: '25,00',
    })

    await treatmentsRepository.create({
      id: 't-01',
      title: 'treatment',
      cost_treatment: '10,00',
      price_treatment: '25,00',
    })
  })
})
