jest.mock('../../../src/server/thumbnails/generateThumbnailBuffer')
jest.mock('../../../src/db/actions/setThumbnail')

import generateThumbnailBuffer from '../../../src/server/thumbnails/generateThumbnailBuffer'
import setThumbnail from '../../../src/db/actions/setThumbnail'
import sut from '../../../src/server/thumbnails/updateThumbnail'

describe('update thumbnail', () => {

  let browser
  let sandbox
  let shareDbDoc
  let page
  let html
  let thumbnailBuffer

  beforeEach(async (done) => {

    page = Symbol('page')

    browser = {
      newPage: jest.fn(() => page)
    }

    html = String(Math.random())
    sandbox = jest.fn(() => Promise.resolve(html))

    thumbnailBuffer = {
      toString: jest.fn(() => 'base64 encoded string')
    }
    generateThumbnailBuffer.mockImplementation(() => Promise.resolve(thumbnailBuffer))

    shareDbDoc = {
      id: String(Math.random())
    }

    await sut(browser, sandbox, shareDbDoc)

    done()
  })

  it('should generate html for provided doc using sandbox', () => {
    expect(sandbox).toHaveBeenCalledWith({id: shareDbDoc.id})
  })

  it('should create brwoser page', () => {
    expect(browser.newPage).toHaveBeenCalled()
  })

  it('should generate thumbnail buffer inside browser page from html', () => {
    expect(generateThumbnailBuffer).toHaveBeenCalledWith(page, html)
  })

  it('should convert thumbnail buffer to base 64', () => {
    expect(thumbnailBuffer.toString).toHaveBeenCalledWith('base64')
  })

  it('should set thumbnail for the doc', () => {
    expect(setThumbnail).toHaveBeenCalledWith(shareDbDoc, 'base64 encoded string')
  })

})
