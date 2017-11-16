import fakeDoc from '../utils/fakeDoc'
import { methodTester } from '../utils/methodTester'

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

  const { testMethod, testMethod1, testMethod2 } = methodTester(vis, mockDoc)

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
