import { DB_DOCUMENTS_PROJECTION, VIS_DOC_TYPE } from '../../../src/constants'
import sut from '../../../src/server/missingThumbnailsDetector/getDocumentsWithoutThumbnail'

describe('get documents without thumbnail', () => {

  let result
  let connection
  let documents

  beforeEach(async (done) => {

    documents = Symbol('documents')

    connection = {
      createFetchQuery: jest.fn((...args) => args[3](null, documents))
    }
    result = await sut(connection)
    done()
  })

  it('should fetch vis documents without thumbnail', () => {
    const [collectionName, query] = connection.createFetchQuery.mock.calls[0]
    expect(collectionName).toEqual(DB_DOCUMENTS_PROJECTION)
    expect(query).toMatchObject({
      $and: [
        {thumbnail: {$exists: false}},
        {type: VIS_DOC_TYPE}
      ]
    })
  })

  it('should return referenced documents', () => {
    expect(result).toBe(documents)
  })

})
