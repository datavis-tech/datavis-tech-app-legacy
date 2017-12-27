jest.mock('../../../src/db/actions/primitives')
import { set } from '../../../src/db/actions/primitives'
import { setDocumentPrivacy as sut } from '../../../src/db/actions/setDocumentPrivacy'

describe('set document privacy', () => {

  let shareDBDoc
  let isPrivate

  beforeEach(() => {
    shareDBDoc = Symbol('shareDBDoc')
    isPrivate = Symbol('isPrivate')
    sut(shareDBDoc, isPrivate)
  })

  it('should set is private property of sharedb doc', () => {
    expect(set).toHaveBeenCalledWith({shareDBDoc, property: 'isPrivate', item: isPrivate})
  })

})
