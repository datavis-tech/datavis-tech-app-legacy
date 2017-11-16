import fakeDoc from '../utils/fakeDoc'

jest.mock('../../src/db/accessors', () => ({
  id: jest.fn()
}))

import { id } from '../../src/db/accessors'
import { Visualization } from '../../src/domain'

describe('domain', () => {

  const vis = Visualization(fakeDoc())

  describe('Visualization', () => {
    it('should expose id method', () => {
      expect(id).not.toHaveBeenCalled()
      vis.id()
      expect(id).toHaveBeenCalled()
    })
  })
})
