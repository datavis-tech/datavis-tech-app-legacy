import fakeDoc from './utils/fakeDoc'

jest.mock('../src/db/accessors', () => ({
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

jest.mock('../src/db/actions', () => ({
  deleteDocument: jest.fn(),
  addCollaborator: jest.fn(),
  removeCollaborator: jest.fn(),
  addReference: jest.fn(),
  removeReference: jest.fn()
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
} from '../src/db/accessors'

import {
  deleteDocument,
  addCollaborator,
  removeCollaborator,
  addReference,
  removeReference
} from '../src/db/actions'

import { Visualization, Dataset } from '../src/domain'

// Utility for testing methods on domain objects.
const methodTester = (domainObject, doc) => ({

  // Tests a method with zero arguments.
  testMethod: (method, fn) => {
    it(`should expose ${method} method`, () => {
      domainObject[method]()
      expect(fn).toHaveBeenCalledWith(doc)
    })
  },

  // Tests a method with a single argument.
  testMethod1: (method, fn, arg) => {
    it(`should expose ${method} method`, () => {
      domainObject[method](arg)
      expect(fn).toHaveBeenCalledWith(doc, arg)
    })
  },

  // Tests a method with two arguments.
  testMethod2: (method, fn, arg1, arg2) => {
    it(`should expose ${method} method`, () => {
      domainObject[method](arg1, arg2)
      expect(fn).toHaveBeenCalledWith(doc, arg1, arg2)
    })
  }
})

describe('domain', () => {

  describe('Visualization', () => {
    const mockDoc = fakeDoc()
    const visualization = Visualization(mockDoc)
    const { testMethod, testMethod1, testMethod2 } = methodTester(visualization, mockDoc)

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

  describe('Dataset', () => {
    const mockDoc = fakeDoc()
    const dataset = Dataset(mockDoc)
    const { testMethod, testMethod1 } = methodTester(dataset, mockDoc)

    describe('accessors', () => {
      testMethod('id', id)
      testMethod('hasData', hasData)
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
    })
  })

})
