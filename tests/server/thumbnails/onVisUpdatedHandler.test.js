jest.mock('../../../src/server/documentContentSandbox/getDocument')
jest.mock('../../../src/server/thumbnails/updateThumbnail')

import getDocument from '../../../src/server/documentContentSandbox/getDocument'
import updateThumbnail from '../../../src/server/thumbnails/updateThumbnail'
import createHandler from '../../../src/server/thumbnails/onVisUpdatedHandler'

describe('on vis updated handler', () => {

  let sut
  let connection
  let browser
  let sandbox
  let message
  let shareDbDoc

  beforeEach(() => {
    connection = Symbol('connection')
    browser = Symbol('browser')
    sandbox = Symbol('sandbox')

    sut = createHandler(connection, browser, sandbox)
  })

  it('should do nothing if message does not exist', async (done) => {
    await sut({})
    expect(getDocument).not.toHaveBeenCalled()
    expect(updateThumbnail).not.toHaveBeenCalled()

    done()
  })

  describe('when message is present', () => {

    beforeEach(async (done) => {

      message = {
        documentId: String(Math.random())
      }

      shareDbDoc = Symbol('doc')
      getDocument.mockImplementation(() => Promise.resolve(shareDbDoc))

      await sut({message: JSON.stringify(message)})
      done()
    })

    it('should retrieve a document', () => {
      expect(getDocument).toHaveBeenCalledWith(connection, message.documentId)
    })

    it('should update thumnail', () => {
      expect(updateThumbnail).toHaveBeenCalledWith(browser, sandbox, shareDbDoc)
    })

  })

})
