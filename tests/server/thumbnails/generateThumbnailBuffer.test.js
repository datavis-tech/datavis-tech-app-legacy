jest.mock('sharp')
import sharp from 'sharp'
import sut from '../../../src/server/thumbnails/generateThumbnailBuffer'

describe('generate thumbnail for document', () => {

  let page
  let html
  let buffer
  let resizedBuffer
  let sharpImpl
  let result

  beforeEach(async (done) => {

    resizedBuffer = Symbol('resizedBuffer')

    sharpImpl = {
      resize: jest.fn(function () { return this }),
      toBuffer: () => resizedBuffer
    }

    sharp.mockImplementation(() => sharpImpl)

    buffer = Symbol('buffer')

    page = {
      setViewport: jest.fn(() => Promise.resolve()),
      setContent: jest.fn(() => Promise.resolve()),
      waitFor: jest.fn(() => Promise.resolve()),
      screenshot: jest.fn(() => Promise.resolve(buffer)),
      close: jest.fn(() => Promise.resolve())
    }

    html = String(Math.random())

    result = await sut(page, html)
    done()
  })

  it('should set view port', () => {
    expect(page.setViewport).toHaveBeenCalledWith({width: 960, height: 500})
  })

  it('should set content', () => {
    expect(page.setContent).toHaveBeenCalledWith(html)
  })

  it('should wait for 5 sec to allow to render content', () => {
    expect(page.waitFor).toHaveBeenCalledWith(5000)
  })

  it('should make a screenshot', () => {
    expect(page.screenshot).toHaveBeenCalled()
  })

  it('should close the page', () => {
    expect(page.close).toHaveBeenCalled()
  })

  it('should resize screenshot', () => {
    expect(sharp).toHaveBeenCalledWith(buffer)
    expect(sharpImpl.resize).toHaveBeenCalledWith(230, 120)
  })

  it('should result to resized buffer', () => {
    expect(result).toBe(resizedBuffer)
  })

})
