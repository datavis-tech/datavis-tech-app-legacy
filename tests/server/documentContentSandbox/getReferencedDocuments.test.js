import { DB_DOCUMENTS_COLLECTION } from '../../../src/constants'
import sut from '../../../src/server/documentContentSandbox/getReferencedDocuments'

describe('get referenced documents', () => {

  let referencesIds
  let result
  let connection
  let referenceDocuments

  beforeEach(async (done) => {

    referencesIds = Symbol('referencesIds')
    referenceDocuments = Symbol('referenceDocuments')

    connection = {
      createFetchQuery: jest.fn((...args) => args[3](null, referenceDocuments))
    }
    result = await sut(connection, referencesIds)
    done()
  })

  it('should fetch referenced documents by ids', () => {
    const [collectionName, query] = connection.createFetchQuery.mock.calls[0]
    expect(collectionName).toEqual(DB_DOCUMENTS_COLLECTION)
    expect(query).toMatchObject({_id: {$in: referencesIds}})
  })

  it('should return referenced documents', () => {
    expect(result).toBe(referenceDocuments)
  })

})
