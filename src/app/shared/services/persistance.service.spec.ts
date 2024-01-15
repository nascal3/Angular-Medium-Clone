import { TestBed } from '@angular/core/testing'

import { PersistanceService } from './persistance.service'

describe('PersistenceService', () => {
  let persistenceService: PersistanceService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersistanceService],
    }).compileComponents()
    persistenceService = TestBed.inject(PersistanceService)
  })

  it('should be created', () => {
    expect(persistenceService).toBeTruthy()
  })

  describe('store', () => {
    it('should return the data stored in localhost', () => {
      persistenceService.set('accessToken', '123qwer34567')
      const result = persistenceService.get('accessToken')
      expect(result).toBe('123qwer34567')
    })
  })
})
