import { constants } from 'dvt-core'
import sut from '../src/getDocument'

describe('get document', () => {

  let id
  let result
  let connection
  let document

  beforeEach(async (done) => {
    document = {
      fetch: jest.fn(callback => callback())
    }
    connection = {
      get: jest.fn(() => document)
    }
    id = String(Math.random())
    result = await sut(connection, id)
    done()
  })

  it('should get document from database', () => {
    expect(connection.get).toHaveBeenCalledWith(constants.DB_DOCUMENTS_COLLECTION, id)
  })

  it('should populate document fields with values', () => {
    expect(document.fetch).toHaveBeenCalled()
  })

  it('should return document', () => {
    expect(result).toBe(document)
  })

})
