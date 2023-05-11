import { InMemoryTreatmentsRepository } from '@/repositories/in-memory/in-memory-treatments-repository'
import { DeleteTreatmentUseCase } from './delete-treatment'
import { beforeEach, describe, expect, it } from 'vitest'

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
      title: 'treatment-01',
      cost_treatment: '10,00',
      price_treatment: '25,00',
    })

    await treatmentsRepository.create({
      id: 't-02',
      title: 'treatment-02',
      cost_treatment: '10,00',
      price_treatment: '25,00',
    })

    await sut.execute({
      treatmentId: 't-01',
    })

    expect(treatmentsRepository.items).toHaveLength(1)
    expect(treatmentsRepository.items).toEqual([
      expect.objectContaining({ title: 'treatment-02' }),
    ])
  })
})
