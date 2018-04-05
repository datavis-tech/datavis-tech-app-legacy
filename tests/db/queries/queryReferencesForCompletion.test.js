jest.mock('../../../src/db/connection', () => ({
  createFetchQuery: jest.fn()
}))

import { DB_DOCUMENTS_PROJECTION, DATA_DOC_TYPE, TECH_DOC_TYPE } from '../../../src/constants'
import connection from '../../../src/db/connection'
import fakeDoc from '../../utils/fakeDoc'
import sut from '../../../src/db/queries/queryReferencesForCompletion'

describe('query references for completion', () => {

  let userId
  let pattern
  let results

  let query
  let documents

  beforeEach(async (done) => {

    userId = String(Math.random())
    pattern = String(Math.random())

    documents = [fakeDoc(), fakeDoc(), fakeDoc()]
    connection.createFetchQuery.mockImplementation((_, q, ___, callback) => callback(null, documents))

    query = {
      $and: [
        { type: { $in: [DATA_DOC_TYPE, TECH_DOC_TYPE] } },
        { $or: [
          { title: { $regex: `.*${pattern}.*` } },
          { _id: pattern }
        ] },
        { $or: [
          { owner: userId },
          { collaborators: { $elemMatch: { id: userId } } }
        ] }
      ]
    }

    results = await sut(userId, pattern)

    done()
  })

  it('should fetch documents that match pattern', () => {
    expect(connection.createFetchQuery).toHaveBeenCalledWith(DB_DOCUMENTS_PROJECTION, query, {}, expect.any(Function))
  })

  it('should return id-title mapping of matched documents', () => {
    const expectedResults = [
      { title: documents[0].data.title, id: documents[0].id },
      { title: documents[1].data.title, id: documents[1].id },
      { title: documents[2].data.title, id: documents[2].id }
    ]

    expectedResults.forEach((er, i) => {
      expect(results[i]).toMatchObject(er)
    })

  })

  it('should return empty array in case no matched docuemnts', async (done) => {
    connection.createFetchQuery.mockImplementation((_, q, ___, callback) => callback(null, []))
    results = await sut('pattern that is not match')
    expect(results).toEqual([])
    done()
  })

})
