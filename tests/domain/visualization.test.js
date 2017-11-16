import fakeDoc from '../utils/fakeDoc'

jest.mock('../../src/db/accessors', () => ({
  id: jest.fn(),
  hasData: jest.fn(),
  references: jest.fn(),
  allReferencesLoaded: jest.fn(),
  title: jest.fn(),
  description: jest.fn(),
  content: jest.fn(),
  owner: jest.fn(),
  collaborators: jest.fn()
}))

import {
  id,
  hasData,
  references,
  allReferencesLoaded,
  title,
  description,
  content,
  owner,
  collaborators
} from '../../src/db/accessors'

jest.mock('../../src/db/actions', () => ({
  deleteDocument: jest.fn(),
  addCollaborator: jest.fn(),
  removeCollaborator: jest.fn(),
  addReference: jest.fn(),
  removeReference: jest.fn()
}))

import {
  deleteDocument,
  addCollaborator,
  removeCollaborator,
  addReference,
  removeReference
} from '../../src/db/actions'

import { Visualization } from '../../src/domain'

describe('domain', () => {

  const mockDoc = fakeDoc()
  const vis = Visualization(mockDoc)

  // Tests a method with zero arguments.
  const testMethod = (method, fn) => {
    it(`should expose ${method} method`, () => {
      vis[method]()
      expect(fn).toHaveBeenCalledWith(mockDoc)
    })
  }

  // Tests a method with a single argument.
  const testMethod1 = (method, fn, arg) => {
    it(`should expose ${method} method`, () => {
      vis[method](arg)
      expect(fn).toHaveBeenCalledWith(mockDoc, arg)
    })
  }

  // Tests a method with two arguments.
  const testMethod2 = (method, fn, arg1, arg2) => {
    it(`should expose ${method} method`, () => {
      vis[method](arg1, arg2)
      expect(fn).toHaveBeenCalledWith(mockDoc, arg1, arg2)
    })
  }

  describe('Visualization', () => {
    describe('accessors', () => {
      testMethod('id', id)
      testMethod('hasData', hasData)
      testMethod('references', references)
      testMethod1('allReferencesLoaded', allReferencesLoaded, [fakeDoc()])
      testMethod('title', title)
      testMethod('description', description)
      testMethod('content', content)
      testMethod('owner', owner)
      testMethod('collaborators', collaborators)
    })
    describe('actions', () => {
      testMethod1('deleteDocument', deleteDocument, () => {})
      testMethod1('addCollaborator', addCollaborator, '007')
      testMethod('removeCollaborator', removeCollaborator)
      testMethod2('addReference', addReference, 'data.csv', '123')
      testMethod1('removeReference', removeReference, 3)
    })
  })
})
