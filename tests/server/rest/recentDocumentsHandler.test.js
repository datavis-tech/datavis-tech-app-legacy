import recentDocumentsHandler from '../../../src/server/rest/recentDocumentsHandler'

describe('recent documents handler', () => {
  let sut
  let documents
  let repository
  let res

  beforeEach(() => {
    documents = Symbol('documents')
    repository = {
      getRecentDocuments: jest.fn(() => documents)
    }
    res = {
      json: jest.fn()
    }
    sut = recentDocumentsHandler(repository)
    sut(null, res)
  })

  it('should get recent documents from repository', () => {
    expect(repository.getRecentDocuments).toHaveBeenCalled()
  })

  it('should return documents as json response', () => {
    expect(res.json).toHaveBeenCalledWith(documents)
  })
})
