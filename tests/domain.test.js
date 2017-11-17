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
  testMethodWith0Args: (method, fn) => {
    it(`should expose ${method} method`, () => {
      domainObject[method]()
      expect(fn).toHaveBeenCalledWith(doc)
    })
  },

  // Tests a method with a single argument.
  testMethodWith1Arg: (method, fn, arg) => {
    it(`should expose ${method} method`, () => {
      domainObject[method](arg)
      expect(fn).toHaveBeenCalledWith(doc, arg)
    })
  },

  // Tests a method with two arguments.
  testMethodWith2Args: (method, fn, arg1, arg2) => {
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
    const {
      testMethodWith0Args,
      testMethodWith1Arg,
      testMethodWith2Args
    } = methodTester(visualization, mockDoc)

    describe('accessors', () => {
      testMethodWith0Args('id', id)
      testMethodWith0Args('hasData', hasData)
      testMethodWith0Args('references', references)
      testMethodWith1Arg('allReferencesLoaded', allReferencesLoaded, [fakeDoc()])
      testMethodWith0Args('title', title)
      testMethodWith0Args('description', description)
      testMethodWith0Args('content', content)
      testMethodWith0Args('owner', owner)
      testMethodWith0Args('collaborators', collaborators)
    })

    describe('actions', () => {
      testMethodWith1Arg('deleteDocument', deleteDocument, () => {})
      testMethodWith1Arg('addCollaborator', addCollaborator, '007')
      testMethodWith0Args('removeCollaborator', removeCollaborator)
      testMethodWith2Args('addReference', addReference, 'data.csv', '123')
      testMethodWith1Arg('removeReference', removeReference, 3)
    })
  })

  describe('Dataset', () => {
    const mockDoc = fakeDoc()
    const dataset = Dataset(mockDoc)
    const {
      testMethodWith0Args,
      testMethodWith1Arg
    } = methodTester(dataset, mockDoc)

    describe('accessors', () => {
      testMethodWith0Args('id', id)
      testMethodWith0Args('hasData', hasData)
      testMethodWith0Args('title', title)
      testMethodWith0Args('description', description)
      testMethodWith0Args('content', content)
      testMethodWith0Args('owner', owner)
      testMethodWith0Args('collaborators', collaborators)
    })

    describe('actions', () => {
      testMethodWith1Arg('deleteDocument', deleteDocument, () => {})
      testMethodWith1Arg('addCollaborator', addCollaborator, '007')
      testMethodWith0Args('removeCollaborator', removeCollaborator)
    })
  })

})
