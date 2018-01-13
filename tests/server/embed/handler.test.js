jest.mock('../../../src/routesUtils', () => ({
  getHrefForRoute: () => 'the href'
}))
jest.mock('../../../src/server/documentContentSandbox')

import createDocumentContentSandbox from '../../../src/server/documentContentSandbox'
import handler from '../../../src/server/embed/handler'

describe('handler', () => {

  let sut

  let backend

  let sandbox
  let html

  beforeEach(() => {

    html = String(Math.random())
    sandbox = jest.fn(() => Promise.resolve(html))
    createDocumentContentSandbox.mockImplementation(() => sandbox)

    backend = Symbol('backend')
    sut = handler(backend)
  })

  it('should create document content sandbox using provided backend', () => {
    expect(createDocumentContentSandbox).toHaveBeenCalledWith(backend)
  })

  describe('handling request', () => {

    let req
    let res

    beforeEach(async (done) => {
      req = {
        params: {
          id: String(Math.random())
        },
        query: {
          origin: String(Math.random())
        }
      }

      res = {
        send: jest.fn()
      }

      await sut(req, res)
      done()
    })

    it('should generate html using sandbox', () => {
      expect(sandbox).toHaveBeenCalledWith({
        id: req.params.id,
        origin: req.query.origin,
        href: 'the href'
      })
    })

    it('should respond with sandbox-ed content', () => {
      expect(res.send).toHaveBeenCalledWith(html)
    })
  })

})
