import { InMemoryTreatmentsRepository } from '@/repositories/in-memory/in-memory-treatments-repository'
import { CreateTreatmentUseCase } from './create-treatment'
import { beforeEach, describe, expect, it } from 'vitest'

let treatmentsRepository: InMemoryTreatmentsRepository
let sut: CreateTreatmentUseCase

describe('Create Treatment Use Case', () => {
  beforeEach(() => {
    treatmentsRepository = new InMemoryTreatmentsRepository()
    sut = new CreateTreatmentUseCase(treatmentsRepository)
  })

  it('should be able to create treatment', async () => {
    const { treatment } = await sut.execute({
      title: 'treatment-01',
      priceTreatment: '25,00',
      costTreatment: '10,00',
    })

    expect(treatment.id).toEqual(expect.any(String))
    expect(treatment.title).toEqual(
      expect.objectContaining({ title: 'treatment-01' }),
    )
  })
})
