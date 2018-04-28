function mockRouter (...args) {}
mockRouter.get = jest.fn()

jest.mock('express', () => ({
  Router: () => mockRouter
}))

jest.mock('../../../src/server/repositories')
import { DocumentRepository } from '../../../src/server/repositories'
jest.mock('../../../src/server/rest/recentDocumentsHandler')
import recentDocumentsHandler from '../../../src/server/rest/recentDocumentsHandler'
import documentsRouter from '../../../src/server/rest/documentsRouter'

describe('documents router', () => {
  let connection
  let repository
  let handler

  beforeEach(() => {

    handler = Symbol('handler')
    recentDocumentsHandler.mockReturnValue(handler)
    DocumentRepository.mockReturnValue(repository)

    connection = Symbol('connection')
    documentsRouter(connection)
  })

  it('should create documents repository using current connection', () => {
    expect(DocumentRepository).toHaveBeenCalledWith(connection)
  })

  it('should create recent documents handler using repository', () => {
    expect(recentDocumentsHandler).toHaveBeenCalledWith(repository)
  })

  it('should have recent documents handler', () => {
    expect(mockRouter.get).toHaveBeenCalledWith('/recent', handler)
  })

})
